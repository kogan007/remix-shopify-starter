import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { config } from "~/framework";

export async function loader(args: LoaderArgs) {
  const data = await config.operations.getStoreFrontData();

  return json(data);
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      {data.shop.name}
      <div>
        Collections
        {data.collections.map((collection) => (
          <div key={collection.handle}>{collection.title}</div>
        ))}
      </div>
    </div>
  );
}
