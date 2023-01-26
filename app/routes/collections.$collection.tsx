import { type LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { config } from "~/framework";

export async function loader({ params }: LoaderArgs) {
  const collectionParam = params.collection;
  if (!collectionParam) return null;
  const data = await config.operations.getCollection(collectionParam);
  return data;
}

export default function Collection() {
  const data = useLoaderData<typeof loader>();
  if (!data) return null;

  return (
    <div>
      <h1>{data.title}</h1>
      {data.description}

      {data.products.map((product) => (
        <div key={product.id}>
          <Link to={`/products/` + product.handle}>{product.title}</Link>
          <img src={product.images[0].url} width={400} height={400} alt="" />
        </div>
      ))}
    </div>
  );
}
