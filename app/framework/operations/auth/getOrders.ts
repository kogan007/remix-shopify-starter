import { redirect } from "@remix-run/node";
import { config } from "~/framework";
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
    Pick<Order, "fulfillmentStatus" | "name" | "orderNumber" | "totalPrice">
  >;
};

type Order = {
  orderNumber: number;
  fulfillmentStatus: string;
  name: string;
  totalPrice: {
    amount: number;
  };
};

async function getShopifyOrders(accessToken: string): Promise<Order[]> {
  const { data } = await config.fetch<{ customer: OrderResponse }>(orderQuery, {
    variables: {
      accessToken: accessToken,
    },
  });

  return data.customer.orders.edges.map(({ node }) => ({
    ...node,
  }));
}
export default async function getOrders(request: Request) {
  const user = await config.operations.auth.getLoggedInUser(request);
  if (!user) return redirect("/");
  const orders = await getShopifyOrders(user.accessToken);
  return orders;
}
