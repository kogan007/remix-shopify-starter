import { config } from "~/framework";
import { getSession } from "~/framework/lib/cartSession";
import { removeShopifyItem } from "./removeItem";

const cartQuantityMutation = `
    mutation cartQuantity(
        $cartId: ID!
        $lines: [CartLineUpdateInput!]!
    ) {
        cartLinesUpdate(
            cartId: $cartId
            lines: $lines
        ) {
            cart {
                id
            }
            userErrors {
                field
                message
            }
        }
    }
`;

async function changeShopifyQuantity(
  item: { id: string; quantity: number },
  cartId: string
) {
  const { id, quantity } = item;

  const { data } = await config.fetch(cartQuantityMutation, {
    variables: { cartId, lines: [{ id, quantity }] },
  });
  return data;
}

export default async function quantity(request: Request): Promise<null> {
  const cartId = await (
    await getSession(request.headers.get("Cookie"))
  ).get("id");
  if (!cartId) return null;
  const body = await request.formData();
  const id = body.get("id");
  const quantity = body.get("quantity");
  if (typeof id !== "string" || !Number.isInteger(Number(quantity)))
    return null;
  if (Number(quantity) === 0) {
    await removeShopifyItem(cartId, [id]);
  } else {
    await changeShopifyQuantity({ id, quantity: Number(quantity) }, cartId);
  }
  return null;
}
