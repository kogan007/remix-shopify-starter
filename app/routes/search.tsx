import type { LoaderArgs } from "@remix-run/node";
import { Form, useLoaderData, useSearchParams } from "@remix-run/react";
import { ProductCard } from "~/components/Product";
import { config } from "~/framework";

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const { searchParams } = url;
  const query = searchParams.get("query") || "";
  const products = await config.operations.getProducts({ first: 30, query });
  return { products };
}
export default function Search() {
  const { products } = useLoaderData<typeof loader>();
  const [params] = useSearchParams();
  const query = params.get("query");
  return (
    <div>
      Search {query && `for ${query}`}
      <div>
        <Form>
          <input type="text" name="query" />
        </Form>
      </div>
      <div>
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
