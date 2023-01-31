import { config } from "..";
import { flattenConnection } from "../lib/utils";
import { type ProductShort, type ProductResponseShort } from "../types/product";

const getProductsQuery = `
    query (
        $first: Int!
        $query: String = ""
    ) {
        products (
            first: $first
            query: $query
        ) {
            edges {
                node {
                    id
                    title
                    vendor
                    handle
                    priceRange{
                      maxVariantPrice{
                        amount
                        currencyCode
                      }
                      minVariantPrice{
                        amount
                        currencyCode
                      }
                    }
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
`;

type GetProductArgs = {
  query?: string;
  first: number;
};
export default async function getProducts(
  args: GetProductArgs = { first: 50 }
): Promise<ProductShort[]> {
  const { data } = await config.fetch<ProductResponseShort>(getProductsQuery, {
    variables: args,
  });
  const products = flattenConnection(data.products).map((item) => ({
    ...item,
    images: flattenConnection(item.images),
  }));
  return products;
}
