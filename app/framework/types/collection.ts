import { type Image, type Edge } from "./global";
import { type ProductShort, type ProductResponseProductShort } from "./product";

export type CollectionResponse = {
  collection: {
    title: string;
    description: string;
    products: Edge<ProductResponseProductShort>;
    image: Image;
  };
};

export type Collection = {
  title: string;
  description: string;
  products: ProductShort[];
  image: Image;
};
