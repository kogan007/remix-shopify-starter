import { authenticator } from "./authenticator";

export default async function logout(request: Request) {
  return await authenticator.logout(request, { redirectTo: "/account/login" });
}
