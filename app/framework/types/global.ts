export interface Edge<T> {
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

export type StoreFrontData = {
  collections: {
    title: string;
    handle: string;
  }[];
  pages: {
    handle: string;
    title: string;
  }[];
  shop: {
    name: string;
  };
  menu: {
    items: {
      title: string;
      handle: string;
    }[];
  };
};
