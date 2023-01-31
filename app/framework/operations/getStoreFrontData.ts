import { config } from "..";
import { flattenConnection } from "../lib/utils";
import type { Image, StoreFrontData } from "../types/global";

const storeFrontDataQuery = `
    query {
        collections(first: 10){
          edges{
            node{
              title	
              handle
              image {
                url
                altText
                width
                height
              }
            }
          }
        }
        footerCompany: menu(handle: "footer-company"){
          items {
            title
            url
          }
        }
        footerShop: menu(handle: "footer-shop"){
          items {
            title
            url
          }
        }
        footerSocial: menu(handle: "footer-social"){
          items {
            title
            url
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

type Menu = {
  items: {
    title: string;
    url: string;
  }[];
};

type StoreFrontDataResponse = {
  collections: {
    edges: {
      node: {
        title: string;
        handle: string;
        image: Image;
      };
    }[];
  };
  footerCompany: Menu;
  footerShop: Menu;
  footerSocial: Menu;
  menu: Menu;
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
  const collections = flattenConnection(data.collections);
  const pages = flattenConnection(data.pages);
  return {
    collections,
    pages,
    shop: data.shop,
    footerCompany: {
      items: data.footerCompany.items.map((item) => ({
        handle: getPathName(item.url),
        title: item.title,
      })),
    },
    footerSocial: {
      items: data.footerSocial.items.map((item) => ({
        handle: getPathName(item.url),
        title: item.title,
      })),
    },
    footerShop: {
      items: data.footerShop.items.map((item) => ({
        handle: getPathName(item.url),
        title: item.title,
      })),
    },
    menu: {
      items: data.menu.items.map((item) => ({
        handle: getPathName(item.url),
        title: item.title,
      })),
    },
  };
}
