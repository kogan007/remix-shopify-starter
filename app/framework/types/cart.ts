import { type Image, type Edge, type Price } from "~/framework/types/global";
import { type ProductShort } from "~/framework/types/product";

export type LineItemResponse = {
  quantity: number;
  id: string;
  merchandise: {
    selectedOptions: {
      name: string;
      value: string;
    }[];
    price: Price;
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
    cost: {
      subtotalAmount: Price;
    };
  };
};

export type LineItem = {
  quantity: number;
  id: string;
  product: Pick<
    ProductShort,
    "handle" | "id" | "images" | "title" | "vendor"
  > & {
    price: Price;
    selectedOptions: {
      name: string;
      value: string;
    }[];
  };
};

export type Cart = {
  lines: LineItem[];
  totalQuantity: number;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Price;
  };
};
