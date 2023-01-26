import { config } from "..";
import type { StoreFrontData } from "../types/global";

const storeFrontDataQuery = `
    query {
        collections(first: 10){
          edges{
            node{
              title	
              handle
            }
          }
        }
        menu(handle: "main-menu"){
          items {
            title
            url
          }
        }
        pages(first: 10){
          edges {
            node {
              title
              handle
            }
          }
        }
        shop {
            name
        }
    }
`;

type StoreFrontDataResponse = {
  collections: {
    edges: {
      node: {
        title: string;
        handle: string;
      };
    }[];
  };
  menu: {
    items: {
      title: string;
      url: string;
    }[];
  };
  pages: {
    edges: {
      node: {
        title: string;
        handle: string;
      };
    }[];
  };
  shop: {
    name: string;
  };
};

const getPathName = (dataUrl: string) => {
  const url = new URL(dataUrl);
  const { pathname } = url;
  return pathname;
};

export default async function getStoreFrontData(): Promise<StoreFrontData> {
  const { data } = await config.fetch<StoreFrontDataResponse>(
    storeFrontDataQuery
  );
  const collections = data.collections.edges.map(({ node }) => ({ ...node }));
  const pages = data.pages.edges.map(({ node }) => ({ ...node }));
  return {
    collections,
    pages,
    shop: data.shop,
    menu: {
      items: data.menu.items.map((item) => ({
        handle: getPathName(item.url),
        title: item.title,
      })),
    },
  };
}
