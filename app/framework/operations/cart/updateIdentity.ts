import { config } from "~/framework";
import { getSession } from "~/framework/lib/cartSession";
import { type Customer } from "~/framework/types/customer";

const buyerIdentityMutation = `
    mutation buyerIdentity (
        $buyerIdentity: CartBuyerIdentityInput!
        $cartId: ID!
    ) {
        cartBuyerIdentityUpdate(
            buyerIdentity: $buyerIdentity
            cartId: $cartId
        ) {
            cart {
                id
                checkoutUrl   
            }
        }
    }
`;
export default async function updateIdentity(
  headers: Request["headers"],
  customer: Customer
) {
  if (!customer) return null;
  const cartId = await (await getSession(headers.get("Cookie"))).get("id");
  if (!cartId) return null;

  const { data } = await config.fetch(buyerIdentityMutation, {
    variables: {
      buyerIdentity: {
        customerAccessToken: customer.accessToken,
      },
      cartId,
    },
  });

  return null;
}
