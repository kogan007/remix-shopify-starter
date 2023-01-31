import { config } from "..";
import { flattenConnection } from "../lib/utils";
import { type ProductResponseProductShort } from "../types/product";

const productRecommendationsQuery = `
    query productRecommendations (
        $productId: ID!
    ) {
        productRecommendations(
            productId: $productId
        ) {
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
`;

type ProductRecommendationResponse = {
  productRecommendations: ProductResponseProductShort[];
};
export default async function getProductRecommendations(productId: string) {
  const { data } = await config.fetch<ProductRecommendationResponse>(
    productRecommendationsQuery,
    {
      variables: {
        productId,
      },
    }
  );
  return data.productRecommendations.map((product) => ({
    ...product,
    images: flattenConnection(product.images),
  }));
}
