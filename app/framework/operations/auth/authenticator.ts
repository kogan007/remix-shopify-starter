import { Authenticator } from "remix-auth";
import type { Customer } from "~/framework/types/customer";
import { sessionStorage } from "../../lib/userSession";
import { FormStrategy } from "remix-auth-form";
import { getAccessToken, getCustomer } from "./login";
import { config } from "~/framework";
import { createCustomer } from "./register";

export const authenticator = new Authenticator<Customer>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form, context }) => {
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    const token = await getAccessToken(email, password);
    const customer = await getCustomer(token);
    const headers = context?.headers as Request["headers"];
    if (headers) {
      await config.operations.cart.updateIdentity(headers, customer);
    }
    return customer;
  }),
  "shopifyLogin"
);

authenticator.use(
  new FormStrategy(async ({ form, context }) => {
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    await createCustomer(email, password);
    const token = await getAccessToken(email, password);
    const customer = await getCustomer(token);
    const headers = context?.headers as Request["headers"];
    if (headers) {
      await config.operations.cart.updateIdentity(headers, customer);
    }
    return customer;
  }),
  "shopifyRegister"
);
