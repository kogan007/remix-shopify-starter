import crypto from "crypto";
import { config } from "~/framework";

const MULTIPASS_KEY = process.env.MULTIPASS_KEY;

if (!MULTIPASS_KEY) {
  throw new Error("Multipass key required");
}

function createKeys() {
  const hash = crypto
    .createHash("sha256")
    .update(MULTIPASS_KEY as string)
    .digest();

  const encriptionKey = hash.slice(0, 16);
  const signingKey = hash.slice(16, 32);
  return { encriptionKey, signingKey };
}

function encrypt(text: string, encryptionKey: Buffer) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-128-cbc", encryptionKey, iv);
  const encrypted = Buffer.concat([
    iv,
    cipher.update(text, "utf-8"),
    cipher.final(),
  ]);
  return encrypted;
}

function sign(data: Buffer, signingKey: Buffer) {
  const signed = crypto.createHmac("sha256", signingKey).update(data).digest();
  return signed;
}

function encode(data: Record<string, any>) {
  const keys = createKeys();
  data["created_at"] = new Date().toISOString();
  const cipher = encrypt(JSON.stringify(data), keys.encriptionKey);

  let token = Buffer.concat([cipher, sign(cipher, keys.signingKey)]).toString(
    "base64"
  );
  token = token
    .replace(/\+/g, "-") // Replace + with -
    .replace(/\//g, "_"); // Replace / with _
  return token;
}
export default async function multipass(request: Request) {
  const customer = await config.operations.auth.getLoggedInUser(request);
  if (!customer) return null;
  const cart = await config.operations.cart.getCart(request);

  const token = encode({ ...customer, return_to: cart?.checkoutUrl });
  return (
    `https://` +
    config.shopName +
    ".myshopify.com/account/login/multipass/" +
    token
  );
}
