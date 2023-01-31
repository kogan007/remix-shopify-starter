import { redirect, type LoaderArgs } from "@remix-run/node";
import { config } from "~/framework";

export async function loader({ request }: LoaderArgs) {
  const cart = await config.operations.cart.getCart(request);
  if (!cart) return redirect("/");
  const url = await config.operations.auth.multipass(request);
  if (url) return redirect(url);
  // return redirect(cart?.checkoutUrl);
  return null;
}
