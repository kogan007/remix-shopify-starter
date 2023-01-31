import { redirect } from "@remix-run/node";
import { config } from "~/framework";
import { flattenConnection } from "~/framework/lib/utils";
import { type Address, type Order } from "~/framework/types/account";
import { type Edge } from "~/framework/types/global";

const getAccountQuery = `
    query getAccount(
        $accessToken: String!
    ) {
        customer(
            customerAccessToken: $accessToken
        ) {
            email
            firstName
            lastName
            phone
            addresses(first: 50) {
                edges {
                    node {
                        address1
                        address2
                        city
                        company
                        country
                    }
                }
            }
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

type AccountResponse = {
  customer: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    addresses: Edge<Address>;
    orders: Edge<Order>;
  };
};
async function getShopifyAccount(accessToken: string) {
  const { data } = await config.fetch<AccountResponse>(getAccountQuery, {
    variables: {
      accessToken,
    },
  });
  return {
    ...data.customer,
    addresses: flattenConnection(data.customer.addresses),
    orders: flattenConnection(data.customer.orders),
  };
}

export default async function getAccount(request: Request) {
  const user = await config.operations.auth.getLoggedInUser(request);
  if (!user) throw redirect("/");
  const account = await getShopifyAccount(user.accessToken);
  return account;
}
