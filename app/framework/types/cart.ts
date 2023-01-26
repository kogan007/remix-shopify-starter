import { type Image, type Edge } from "~/framework/types/global";
import { type ProductShort } from "~/framework/types/product";

export type LineItemResponse = {
  quantity: number;
  id: string;
  merchandise: {
    product: {
      id: string;
      title: string;
      vendor: string;
      handle: string;
      images: Edge<Image>;
    };
  };
};

export type CartResponse = {
  cart: {
    checkoutUrl: string;
    totalQuantity: number;
    lines: Edge<LineItemResponse>;
  };
};

export type LineItem = {
  quantity: number;
  id: string;
  product: ProductShort;
};

export type Cart = {
  items: LineItem[];
  totalQuantity: number;
  checkoutUrl: string;
};
