import { config } from "..";
import { flattenConnection } from "../lib/utils";
import { type Product, type ProductResponseProduct } from "../types/product";

const getProductQuery = `
    query (
        $handle: String!
        $country: CountryCode
        $language: LanguageCode
    ) @inContext (
      country: $country
      language: $language
    ) {
        product(handle: $handle) {
            id
            title
            vendor
            description
            options{
              name
              values
            }
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
            variants(first: 250) {
              edges {
                node {
                  id
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                  selectedOptions{
                    name
                    value
                  }
                }
              }
            }
            images(first: 10) {
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
`;

export default async function getProduct(
  handle: string,
  country: string = "US",
  language: string = "EN"
): Promise<Product> {
  try {
    const { data } = await config.fetch<{ product: ProductResponseProduct }>(
      getProductQuery,
      {
        variables: {
          handle,
          country: country.toUpperCase(),
          language: language.toUpperCase(),
        },
      }
    );

    const product = {
      ...data.product,
      images: flattenConnection(data.product.images),
      variants: flattenConnection(data.product.variants),
    };
    return product;
  } catch (e) {
    throw new Error("Error getting product");
  }
}
