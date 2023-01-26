import { json } from "@remix-run/node";
import { config } from "~/framework";
import { commitSession, getSession } from "~/framework/lib/cartSession";

type LineItem = {
  id: string;
  quantity: number;
};

type CartCreateResponse = {
  cartCreate: {
    cart: {
      id: string;
    };
  };
};
async function createCart(items: LineItem[]) {
  const createCartMutation = `
    mutation cartCreate(
        $items: [CartLineInput!]
    ) {
        cartCreate(
            input: {
                lines: $items
            }
        ) {
            cart {
                id
            }
        }
    }
    `;

  const { data } = await config.fetch<CartCreateResponse>(createCartMutation, {
    variables: {
      items: items.map((item) => ({
        quantity: item.quantity,
        merchandiseId: item.id,
      })),
    },
  });

  return data.cartCreate.cart.id;
}

async function addLineItems(items: LineItem[], cartId: string) {
  const addLineItemMutation = `
        mutation cartLinesAdd(
            $items: [CartLineInput!]!
            $cartId: ID!
        ) {
            cartLinesAdd(
                cartId: $cartId
                lines: $items
            ) {
                cart {
                    id
                }
            }
        }
    `;

  const { data } = await config.fetch(addLineItemMutation, {
    variables: {
      cartId,
      items: items.map((item) => ({
        quantity: item.quantity,
        merchandiseId: item.id,
      })),
    },
  });

  return data;
}
export default async function addToCart(request: Request) {
  const body = await request.formData();
  const id = body.get("id");
  const quantity = body.get("quantity");
  if (!id || !quantity) return null;
  if (typeof id !== "string" || typeof Number(quantity) !== "number")
    return null;

  const lineItems = [{ quantity: Number(quantity), id }];

  const cartCookie = await getSession(request.headers.get("Cookie"));
  if (cartCookie.has("id")) {
    const id = cartCookie.get("id");
    const data = await addLineItems(lineItems, id);

    return json(data);
  } else {
    const id = await createCart(lineItems);
    cartCookie.set("id", id);

    return json(null, {
      headers: {
        "Set-Cookie": await commitSession(cartCookie),
      },
    });
  }
}
