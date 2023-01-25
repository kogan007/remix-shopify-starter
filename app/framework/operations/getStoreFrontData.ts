import { config } from "..";

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
  shop: {
    name: string;
  };
};
export default async function getStoreFrontData() {
  const { data } = await config.fetch<StoreFrontDataResponse>(
    storeFrontDataQuery
  );
  const collections = data.collections.edges.map(({ node }) => ({ ...node }));
  return {
    collections,
    shop: data.shop,
  };
}
