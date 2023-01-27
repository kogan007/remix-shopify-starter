import { config } from "~/framework";
import { getSession } from "~/framework/lib/cartSession";
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
            totalQuantity
            checkoutUrl
            lines(first: 250) {
                edges {
                    node {
                        quantity
                        id
                        merchandise{
                            ... on ProductVariant {
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

  const formatCart = {
    ...cart,
    lines: cart.lines.edges.map(({ node }) => ({
      ...node,
      product: {
        ...node.merchandise.product,
        price: node.merchandise.price,
        images: node.merchandise.product.images.edges.map(({ node }) => ({
          ...node,
        })),
        selectedOptions: node.merchandise.selectedOptions,
      },
    })),
  };
  return formatCart;
}
export default async function getCart(request: Request) {
  const cartId = (await getSession(request.headers.get("Cookie"))).get("id");

  if (typeof cartId !== "string") return null;
  const cart = await getShopifyCart(cartId);
  return cart;
}
