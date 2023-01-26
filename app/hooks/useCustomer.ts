import { useRouteLoaderData } from "@remix-run/react";
import type { Customer } from "~/framework/types/customer";

export default function useCustomer(): Customer | null {
  const { customer } = useRouteLoaderData("root") as { customer: Customer };
  return customer;
}
