import { config } from "..";
import { type ProductResponseProduct } from "../types/product";

const getProductQuery = `
    query (
        $handle: String!
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
            variants(first: 10) {
              edges {
                node {
                  id
                  availableForSale
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

export default async function getProduct(handle: string) {
  try {
    const { data } = await config.fetch<{ product: ProductResponseProduct }>(
      getProductQuery,
      { variables: { handle } }
    );
    const product = {
      ...data.product,
      images: data.product.images.edges.map(({ node }) => ({ ...node })),
      variants: data.product.variants.edges.map(({ node }) => ({ ...node })),
    };
    return product;
  } catch (e) {
    throw new Error("Error getting product");
  }
}
