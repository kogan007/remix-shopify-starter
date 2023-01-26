import { config } from "..";
import { type Edge } from "../types/global";
import {
  type ProductShort,
  type ProductResponseProductShort,
} from "../types/product";

const collectionQuery = `
    query collectionQuery (
        $handle: String!
        $first: Int = 50
    ) {
        collection(
            handle: $handle
        ) {
            description 
            title
            products (
                first: $first
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

type CollectionResponse = {
  collection: {
    title: string;
    description: string;
    products: Edge<ProductResponseProductShort>;
  };
};

type Collection = {
  title: string;
  description: string;
  products: ProductShort[];
};
export default async function getCollection(
  handle: string
): Promise<Collection> {
  const { data } = await config.fetch<CollectionResponse>(collectionQuery, {
    variables: {
      handle,
    },
  });
  const collection = {
    ...data.collection,
    products: data.collection.products.edges.map(({ node }) => ({
      ...node,
      images: node.images.edges.map(({ node }) => ({ ...node })),
    })),
  };
  return collection;
}
