import { config } from "~/framework";

const recoverMutation = `
    mutation customerRecover(
        $email: String!
    ) {
        customerRecover(
            email: $email
        ) {
            customerUserErrors {
                code
            }
        }
    }
`;

type RecoverResponse = {
  customerUserErrors: {
    code: string;
  }[];
};
export default async function recoverAccount(email: string) {
  const { data } = await config.fetch<RecoverResponse>(recoverMutation, {
    variables: {
      email,
    },
  });

  return data.customerUserErrors;
}
