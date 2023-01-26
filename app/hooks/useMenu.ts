import { useRouteLoaderData } from "@remix-run/react";
import type { StoreFrontData } from "~/framework/types/global";

export default function useMenu() {
  const { menu } = useRouteLoaderData("root") as StoreFrontData;
  return menu;
}
