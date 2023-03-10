import { type Price, type Edge, type Image } from "./global";

export type ProductShort = {
  id: string;
  title: string;
  vendor: string;
  handle: string;
  images: Image[];
  priceRange: {
    maxVariantPrice: Price;
    minVariantPrice: Price;
  };
};

export type Product = ProductShort & {
  variants: Variant[];
  options: {
    name: string;
    values: string[];
  }[];
};

export type Variant = {
  id: string;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  availableForSale: boolean;
  price: Price;
};

export type ProductResponseProductShort = ProductShort & {
  images: Edge<Image>;
};

export type ProductResponseShort = {
  products: Edge<ProductResponseProductShort>;
};

export type ProductResponseProduct = ProductResponseProductShort & {
  variants: Edge<Variant>;
  options: {
    name: string;
    values: string[];
  }[];
};
