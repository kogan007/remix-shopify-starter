import { useRouteLoaderData } from "@remix-run/react";
import type { Cart } from "~/framework/types/cart";

export default function useCart(): Cart | null {
  const { cart } = useRouteLoaderData("root") as { cart: Cart };
  return cart;
}
