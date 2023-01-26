import { config } from "..";

const getPageQuery = `
    query getPageQuery (
        $handle: String!
    ) {
        page(
            handle: $handle
        ) {
            body
            bodySummary
        }
    }
`;

type Page = {
  body: string;
  bodySummary: string;
};
export default async function getPage(handle: string): Promise<Page> {
  const { data } = await config.fetch<{ page: Page }>(getPageQuery, {
    variables: {
      handle,
    },
  });

  return data.page;
}
