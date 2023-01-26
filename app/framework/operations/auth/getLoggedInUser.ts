import { authenticator } from "./authenticator";

export default async function getLoggedInUser(request: Request) {
  const user = await authenticator.isAuthenticated(request);
  return user;
}
