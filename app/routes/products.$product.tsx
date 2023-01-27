import { type ActionArgs, defer, type LoaderArgs } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { YotpoReviews } from "~/components/Integrations";
import { ProductView } from "~/components/Product";
import { config } from "~/framework";
import { yotpo } from "~/framework/integrations";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  console.log(Object.fromEntries(formData));
  return null;
}
export async function loader({ params }: LoaderArgs) {
  const productParam = params.product;
  if (!productParam) return null;
  const product = await config.operations.getProduct(productParam);
  const productReviewsPromise = yotpo.operations.getReviews({
    productId: product.id.split("gid://shopify/Product/")[1],
  });
  return defer({
    product,
    productReviewsPromise,
  });
}

export default function Product() {
  const data = useLoaderData<typeof loader>();
  if (!data?.product) return null;

  return (
    <ProductView product={data.product}>
      <Suspense fallback="">
        <Await resolve={data.productReviewsPromise} errorElement="">
          {(data) => (
            <YotpoReviews
              reviews={data.reviews}
              averageScore={data.averageScore}
              pagination={data.pagination}
            />
          )}
        </Await>
      </Suspense>
    </ProductView>
  );
}
