import { type LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { ProductCard } from "~/components/Product";
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
      <div className="relative mt-8">
        <div className="relative w-full overflow-x-auto">
          <ul className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0">
            {data.products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
