import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { config } from "~/framework";

export function loader({ request }: LoaderArgs) {
  return config.operations.auth.getOrders(request);
}

export default function Orders() {
  const data = useLoaderData<typeof loader>();
  console.log(data);
  return <div>Orders</div>;
}
