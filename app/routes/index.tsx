import { json, type LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { config } from "~/framework";

export async function loader(args: LoaderArgs) {
  const { shop, collections } = await config.operations.getStoreFrontData();
  const products = await config.operations.getProducts()
  return json({ shop, collections, products });
}

export default function Index() {
  const {shop, products, collections } = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      {shop.name}
      <div>
        Collections
        {collections.map((collection) => (
          <div key={collection.handle}>{collection.title}</div>
        ))}
      </div>
      <div>
        Products
        <div className="grid grid-cols-3">
          {products.map(product => (
            <div key={product.id}>
              <Link to={`/products/` + product.handle}>
              {product.title}
              </Link>
              <img src={product.images[0].url} width={400} height={400}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
