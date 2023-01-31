import { useRouteLoaderData } from "@remix-run/react";
import type { StoreFrontData } from "~/framework/types/global";

export default function useFooterMenu() {
  const { footerCompany, footerShop, footerSocial } = useRouteLoaderData(
    "root"
  ) as StoreFrontData;
  return { footerCompany, footerShop, footerSocial };
}
