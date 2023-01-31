import type { ActionArgs } from "@remix-run/node";
import { config } from "~/framework";

export async function action({ request }: ActionArgs) {
  return await config.operations.auth.logout(request);
}
