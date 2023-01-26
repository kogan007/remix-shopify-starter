import { json, type LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { config } from "~/framework";

export async function loader(args: LoaderArgs) {
  const shopInfoPromise = config.operations.getStoreFrontData();
  const productsPromise = config.operations.getProducts({ first: 30 });
  const [{ shop, collections, menu }, products] = await Promise.all([
    shopInfoPromise,
    productsPromise,
  ]);
  return json({ shop, collections, products, menu });
}

export default function Index() {
  const { shop, products, collections } = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      {shop.name}
      <div>
        Collections
        {collections.map((collection) => (
          <div key={collection.handle}>
            <Link to={`/collections/` + collection.handle}>
              {collection.title}
            </Link>
          </div>
        ))}
      </div>
      <div>
        Products
        <div className="grid grid-cols-3">
          {products.map((product) => (
            <div key={product.id}>
              <Link to={`/products/` + product.handle}>{product.title}</Link>
              <img
                src={product.images[0].url}
                width={400}
                height={400}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
