import { type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { CategoryLayout } from "~/components/Category";

import { config } from "~/framework";

export async function loader({ params, request }: LoaderArgs) {
  const collectionParam = params.collection;
  if (!collectionParam) return null;
  const { searchParams } = new URL(request.url);
  const lte = searchParams.get("lte");
  const gte = searchParams.get("gte");
  const filter =
    lte || gte
      ? [
          {
            price: {
              ...(lte && {
                max: Number(lte),
              }),
              ...(gte && {
                min: Number(gte),
              }),
            },
          },
        ]
      : [];
  const data = await config.operations.getCollection(collectionParam, filter);
  return data;
}

export default function Collection() {
  const data = useLoaderData<typeof loader>();
  if (!data) return null;

  return <CategoryLayout data={data} />;
}
