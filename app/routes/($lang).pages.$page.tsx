import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { config } from "~/framework";

export async function loader({ params }: LoaderArgs) {
  const pageParam = params.page;
  if (!pageParam) return null;
  const page = await config.operations.getPage(pageParam);
  return page;
}
export default function Page() {
  const data = useLoaderData<typeof loader>();

  return <div>Page</div>;
}
