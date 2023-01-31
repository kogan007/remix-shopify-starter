import { config } from "~/framework";

const confirmRecoverMutation = `
    mutation confirmRecover (
        $id: ID!
        $input: CustomerResetInput!
    ) {
        customerReset(
            id: $id
            input: $input
        ) {
            customerAccessToken {
                accessToken
            }
        }
    }
`;

type RecoverMutationResponse = {
  customerReset: {
    customerAccessToken: {
      accessToken: string;
    };
  };
};
export default async function confirmRecover(
  customerId: string,
  resetToken: string,
  newPassword: string
) {
  const { data } = await config.fetch<RecoverMutationResponse>(
    confirmRecoverMutation,
    {
      variables: {
        input: {
          resetToken,
          password: newPassword,
        },
        id: `gid://shopify/Customer/` + customerId,
      },
    }
  );
  console.log(data);
  return data.customerReset.customerAccessToken.accessToken;
}
