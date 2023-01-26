import { config } from "..";

type Variables = {
  variables?: Record<string, any>;
};
export default async function fetchGraphql<T = {}>(
  query: string,
  { variables }: Variables = {}
): Promise<{ data: T }> {
  try {
    const { apiToken, commerceUrl } = config;
    const res = await fetch(commerceUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": apiToken,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const { data, errors, status } = await res.json();

    if (errors) {
      console.log(errors);
      throw new Error(`Shopify graphql error ${status}`);
    }

    return { data };
  } catch (e) {
    console.log(e);
    throw new Error("Unexpected shopify graphql error");
  }
}
