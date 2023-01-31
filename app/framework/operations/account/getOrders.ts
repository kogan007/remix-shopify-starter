import { redirect } from "@remix-run/node";
import { config } from "~/framework";
import { flattenConnection } from "~/framework/lib/utils";
import { type Order } from "~/framework/types/account";
import type { Edge } from "~/framework/types/global";

const orderQuery = `
    query orderQuery(
        $accessToken: String!
    ) {
        customer(
            customerAccessToken: $accessToken
        ) {
            orders(first: 50) {
                edges {
                    node {
                        processedAt
                        id
                        orderNumber
                        fulfillmentStatus
                        name
                        totalPrice{
                            amount
                        }

                    }
                }
            }
        }
    }
`;

type OrderResponse = {
  orders: Edge<
    Pick<
      Order,
      | "fulfillmentStatus"
      | "name"
      | "orderNumber"
      | "totalPrice"
      | "id"
      | "processedAt"
    >
  >;
};

async function getShopifyOrders(accessToken: string): Promise<Order[]> {
  const { data } = await config.fetch<{ customer: OrderResponse }>(orderQuery, {
    variables: {
      accessToken: accessToken,
    },
  });

  return flattenConnection<Order>(data.customer.orders);
}
export default async function getOrders(request: Request) {
  const user = await config.operations.auth.getLoggedInUser(request);
  if (!user) return redirect("/");
  const orders = await getShopifyOrders(user.accessToken);
  return orders;
}
