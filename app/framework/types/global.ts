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
