import { config } from "~/framework";
import { authenticator } from "./authenticator";

const registerMutation = `
    mutation registerMutation(
        $input: CustomerCreateInput! 
    ) {
        customerCreate (
            input: $input
        ) {
            customer {
                id
            }
            customerUserErrors {
                code
                field
                message
            }
        }
    }
`;

type RegisterResponse = {
  customerCreate: {
    customer: {
      id: string;
    };
  };
};
export async function createCustomer(email: string, password: string) {
  const { data } = await config.fetch<RegisterResponse>(registerMutation, {
    variables: {
      input: { email, password },
    },
  });
  console.log(data);
  return data.customerCreate.customer.id;
}
export default async function register(request: Request) {
  return await authenticator.authenticate("shopifyRegister", request, {
    successRedirect: "/",
    context: { headers: request.headers },
  });
}
