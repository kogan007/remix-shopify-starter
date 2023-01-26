export type ProductShort = {
  id: string;
  title: string;
  vendor: string;
  handle: string;
  images: Image[];
};

export type Product = ProductShort & {
  variants: Variant[];
};

export type Variant = {
  id: string;
};

interface Edge<T> {
  edges: {
    node: T;
  }[];
}

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type ProductResponseProductShort = ProductShort & {
  images: Edge<Image>;
};

export type ProductResponseShort = {
  products: Edge<ProductResponseProductShort>;
};

export type ProductResponseProduct = ProductResponseProductShort & {
  variants: Edge<Variant>;
};
