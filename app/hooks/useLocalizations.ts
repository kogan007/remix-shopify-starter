import { useRouteLoaderData } from "@remix-run/react";
import { type LocalizationResponse } from "~/framework/types/global";

export default function useLocalizations() {
  const { localizationPromise } = useRouteLoaderData("root") as {
    localizationPromise: Promise<LocalizationResponse>;
  };

  return localizationPromise;
}
