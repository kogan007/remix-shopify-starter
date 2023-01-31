import { config } from "..";
import { type LocalizationResponse } from "../types/global";

const getLocalizationQuery = `
    query getLocalizations {
        localization {
            availableCountries {
                isoCode
                name
                currency {
                    isoCode
                }
            }
        }
    }
`;

export default async function getLocalizations() {
  const { data } = await config.fetch<LocalizationResponse>(
    getLocalizationQuery
  );
  return data.localization.availableCountries;
}
