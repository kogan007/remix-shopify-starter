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
            totalQuantity
            checkoutUrl
            lines(first: 250) {
                edges {
                    node {
                        quantity
                        id
                        merchandise{
                            ... on ProductVariant {
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
    items: cart.lines.edges.map(({ node }) => ({
      ...node,
      product: {
        ...node.merchandise.product,
        images: node.merchandise.product.images.edges.map(({ node }) => ({
          ...node,
        })),
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
