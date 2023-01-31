import { config } from "~/framework";

const createCheckoutMutation = `
    mutation createCheckout(
        $input: CheckoutCreateInput!
    ) {
        checkoutCreate(
            input: $input
        ) {
            checkout {
                webUrl
                id
            }
            checkoutUserErrors{
                message
            }
        }
    }
`;

type CreateCheckoutResponse = {
  checkoutCreate: {
    checkout: {
      webUrl: string;
      id: string;
    };
  };
};
export default async function createCheckout(request: Request) {
  const cart = await config.operations.cart.getCart(request);
  if (cart) {
    const lineItems = cart.lines.map((item) => ({
      quantity: item.quantity,
      variantId: item.product.variantId,
    }));

    const { data } = await config.fetch<CreateCheckoutResponse>(
      createCheckoutMutation,
      {
        variables: {
          input: {
            lineItems,
          },
        },
      }
    );
    console.log(data.checkoutCreate);
    return data.checkoutCreate.checkout;
  }
}
