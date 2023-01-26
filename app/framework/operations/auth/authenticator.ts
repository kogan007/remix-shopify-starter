import { Authenticator } from "remix-auth";
import type { Customer } from "~/framework/types/customer";
import { sessionStorage } from "../../lib/userSession";
import { FormStrategy } from "remix-auth-form";
import { getAccessToken, getCustomer } from "./login";

export const authenticator = new Authenticator<Customer>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    const token = await getAccessToken(email, password);
    const customer = await getCustomer(token);
    return customer;
  }),
  "shopifyLogin"
);
