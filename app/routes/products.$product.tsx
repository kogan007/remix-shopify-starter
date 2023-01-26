import { type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ProductView } from "~/components/Product";
import { config } from "~/framework";

export async function loader({ params }: LoaderArgs) {
  const productParam = params.product;
  if (!productParam) return null;
  const product = await config.operations.getProduct(productParam);
  return product;
}

export default function Product() {
  const product = useLoaderData<typeof loader>();

  if (!product) return null;
  return <ProductView product={product} />;
}
