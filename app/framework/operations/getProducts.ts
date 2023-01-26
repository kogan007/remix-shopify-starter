import { config } from "..";
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
  const products = data.products.edges.map(({ node }) => ({
    ...node,
    images: node.images.edges.map(({ node }) => ({ ...node })),
  }));
  return products;
}
