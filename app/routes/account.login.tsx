import { type ActionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { config } from "~/framework";

export async function action({ request }: ActionArgs) {
  return await config.operations.auth.login(request);
}
export default function Login() {
  return (
    <div>
      Login
      <div>
        <Form method="post">
          <input name="email" type="string" />
          <input name="password" type="password" />
          <button>Submit</button>
        </Form>
      </div>
    </div>
  );
}
