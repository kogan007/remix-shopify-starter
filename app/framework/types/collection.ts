import { type Edge } from "./global";
import { type ProductShort, type ProductResponseProductShort } from "./product";

export type CollectionResponse = {
  collection: {
    title: string;
    description: string;
    products: Edge<ProductResponseProductShort>;
  };
};

export type Collection = {
  title: string;
  description: string;
  products: ProductShort[];
};
