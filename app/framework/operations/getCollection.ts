import { config } from "..";
import { flattenConnection } from "../lib/utils";
import type { Collection, CollectionResponse } from "../types/collection";

const collectionQuery = `
    query collectionQuery (
        $handle: String!
        $first: Int = 50
        $filters: [ProductFilter!]
        $country: CountryCode
    ) @inContext(
      country: $country
    ) {
        collection(
            handle: $handle
        ) {
            description 
            title
            image {
              url
              altText
              width
              height
            }
            products (
                first: $first
                filters: $filters
            ) {
                edges {
                    node {
                        id
                        title
                        vendor
                        handle
                        images(first: 1){
                            edges {
                                node {
                                    url
                                    altText
                                    width
                                    height
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

type Filter =
  | {
      price: {
        min?: number;
        max?: number;
      };
    }
  | {
      available: boolean;
    };

export default async function getCollection(
  handle: string,
  filters?: Filter[],
  country: string = "US"
): Promise<Collection> {
  const { data } = await config.fetch<CollectionResponse>(collectionQuery, {
    variables: {
      handle,
      filters,
      country: country.toUpperCase(),
    },
  });
  const collection = {
    ...data.collection,
    products: flattenConnection(data.collection.products).map((item) => ({
      ...item,
      images: flattenConnection(item.images),
    })),
  };
  return collection;
}
