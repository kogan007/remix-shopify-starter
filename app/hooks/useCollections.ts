import { useRouteLoaderData } from "@remix-run/react";
import type { StoreFrontData } from "~/framework/types/global";

export default function useCollections() {
  const { collections } = useRouteLoaderData("root") as StoreFrontData;
  return collections;
}
