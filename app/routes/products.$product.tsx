import { type LoaderArgs } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { config } from "~/framework";

export async function loader({ params }: LoaderArgs) {
  const productParam = params.product;
  if (!productParam) return null;
  const product = await config.operations.getProduct(productParam);
  return product;
}

export default function Product() {
  const product = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  if (!product) return null;
  return (
    <div>
      {product.title}
      <img src={product.images[0].url} alt="" />

      <fetcher.Form method="post" action="/cart">
        <input type="hidden" name="id" value={product.variants[0].id} />
        <input type="number" name="quantity" defaultValue={1} />
        <button>Add to cart</button>
      </fetcher.Form>
    </div>
  );
}
