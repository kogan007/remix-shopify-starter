import { config } from "~/framework";
import { getSession } from "~/framework/lib/cartSession";
import { flattenConnection } from "~/framework/lib/utils";
import type { Cart, CartResponse } from "~/framework/types/cart";

const getCartQuery = `
    query(
        $cartId: ID!
    ) {
        cart(
            id: $cartId
        ) {
            cost {
              subtotalAmount{
                amount
                currencyCode
              }
            }
            id
            totalQuantity
            checkoutUrl
            lines(first: 250) {
                edges {
                    node {
                        quantity
                        id
                        merchandise{
                            ... on ProductVariant {
                                id
                                selectedOptions{
                                  name
                                  value
                                }
                                price {
                                  amount
                                  currencyCode
                                }
                                product {
                                    id
                                    title
                                    vendor
                                    handle   
                                    images(first: 1){
                                        edges {
                                            node {
                                                url
                                                altText
                                                width
                                                height
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

async function getShopifyCart(cartId: string): Promise<Cart> {
  const {
    data: { cart },
  } = await config.fetch<CartResponse>(getCartQuery, {
    variables: {
      cartId,
    },
  });
  const formatCart: Cart = {
    ...cart,
    lines: flattenConnection(cart.lines).map((item) => {
      const product = {
        ...item.merchandise.product,
        variantId: item.merchandise.id,
        price: item.merchandise.price,
        images: flattenConnection(item.merchandise.product.images),
        selectedOptions: item.merchandise.selectedOptions,
      };

      return {
        quantity: item.quantity,
        id: item.id,
        product,
      };
    }),
  };

  return formatCart;
}
export default async function getCart(request: Request) {
  const cartId = (await getSession(request.headers.get("Cookie"))).get("id");

  if (typeof cartId !== "string") return null;
  const cart = await getShopifyCart(cartId);
  return cart;
}
