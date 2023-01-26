import { type ActionArgs } from "@remix-run/node";
import { config } from "~/framework";

export async function action({ request }: ActionArgs) {
  return await config.operations.cart.addToCart(request);
}
export default function Cart() {
  return <div>Cart</div>;
}
