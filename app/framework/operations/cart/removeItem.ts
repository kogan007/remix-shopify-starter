import { config } from "~/framework";
import { getSession } from "~/framework/lib/cartSession";

const removeItemMutation = `
    mutation removeItem(
        $cartId: ID!
        $lineIds: [ID!]!
    ) {
        cartLinesRemove(
            cartId: $cartId
            lineIds: $lineIds
        ) {
            cart {
                id
            }
        }
    }
`;

export async function removeShopifyItem(cartId: string, lineIds: String[]) {
  const { data } = await config.fetch(removeItemMutation, {
    variables: {
      cartId,
      lineIds,
    },
  });
  return data;
}
export default async function removeItem(request: Request) {
  const formData = await request.formData();
  const lineId = formData.get("lineId");
  if (typeof lineId !== "string") return null;
  const cartId = (await getSession(request.headers.get("Cookie"))).get("id");
  if (!cartId) return null;
  await removeShopifyItem(cartId, [lineId]);
  return null;
}
