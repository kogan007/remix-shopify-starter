import { config } from "~/framework";

const discountMutation = `
    mutation discountMutation(
        $cartId: ID!
        $discountCodes: [String!]
    ) {
        cartDiscountCodesUpdate(
            cartId: $cartId
            discountCodes: $discountCodes
        ) {
            cart {
                id
            }
        }
    }
`;

type DiscountResponse = {
  cartDiscountCodesUpdate: {
    cart: {
      id: string;
    };
  };
};
async function shopifyDiscountCode(cartId: string, discountCode: string) {
  const { data } = await config.fetch<DiscountResponse>(discountMutation, {
    variables: {
      cartId,
      discountCodes: [discountCode],
    },
  });

  return data.cartDiscountCodesUpdate.cart.id;
}

export default async function discountCode(
  request: Request,
  action: "add" | "remove"
) {
  const cart = await config.operations.cart.getCart(request);
  if (!cart) return null;
  const body = await request.formData();
  const discountCode = body.get("code");
  if (typeof discountCode !== "string") return null;
  switch (action) {
    case "add": {
      return await shopifyDiscountCode(cart.id, discountCode);
    }
    case "remove": {
      return await shopifyDiscountCode(cart.id, "");
    }
  }
}
