import { type LoaderArgs, type ActionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { config } from "~/framework";

export async function loader({ request }: LoaderArgs) {
  return await config.operations.cart.getCart(request);
}
export async function action({ request }: ActionArgs) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");
  switch (action) {
    case "quantity": {
      return await config.operations.cart.quantity(request);
    }
    case "remove": {
      return await config.operations.cart.removeItem(request);
    }
    default: {
      return await config.operations.cart.addToCart(request);
    }
  }
}
export default function Cart() {
  const data = useLoaderData<typeof loader>();
  if (!data) return null;
  return (
    <div>
      {data.lines.map((item) => (
        <div key={item.id}>
          <Link to={`/products/` + item.product.handle}>
            {item.product.title}
          </Link>
          <span>Quantity: {item.quantity}</span>
          <img src={item.product.images[0].url} alt="" />
        </div>
      ))}
    </div>
  );
}
