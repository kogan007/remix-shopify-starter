import { config } from "~/framework";
import type {
  Customer,
  CustomerResponse,
  TokenResponse,
} from "~/framework/types/customer";
import { authenticator } from "./authenticator";

const customerTokenMutation = `
    mutation customerTokenMutation(
        $email: String!
        $password: String!
    ) {
        customerAccessTokenCreate(
            input: {
                email: $email
                password: $password
            }
        ) {
            customerAccessToken {
                accessToken
            }
        }
    }
`;

const getCustomerQuery = `
    query getCustomerQuery(
        $accessToken: String!
    ) {
        customer(
            customerAccessToken: $accessToken
        ) {
            id
            firstName
            lastName
            email
            phone
        }
    }
`;

export async function getCustomer(accessToken: string): Promise<Customer> {
  const { data } = await config.fetch<CustomerResponse>(getCustomerQuery, {
    variables: {
      accessToken,
    },
  });
  return data.customer;
}

export async function getAccessToken(
  email: string,
  password: string
): Promise<string> {
  const { data } = await config.fetch<TokenResponse>(customerTokenMutation, {
    variables: {
      email,
      password,
    },
  });
  return data.customerAccessTokenCreate.customerAccessToken.accessToken;
}

export default async function login(request: Request) {
  return await authenticator.authenticate("shopifyLogin", request, {
    successRedirect: "/",
  });
}
