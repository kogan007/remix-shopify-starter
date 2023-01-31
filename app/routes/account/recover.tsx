import { type ActionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useState } from "react";
import { config } from "~/framework";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  if (typeof email !== "string") return null;
  const data = await config.operations.auth.recoverAccount(email);
  return data ?? null;
}
export default function AccountRecoverForm() {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);

  async function onSubmit(event: any) {
    setEmailError(null);
    setSubmitError(null);

    //   const newEmailError = emailValidation(event.currentTarget.email);

    //   if (newEmailError) {
    //     setEmailError(newEmailError);
    //     return;
    //   }

    //   setEmail('');
    //   setSubmitSuccess(true);
  }

  return (
    <div className="flex justify-center my-24 px-4">
      <div className="max-w-md w-full">
        {submitSuccess ? (
          <>
            <h1 className="text-4xl">Request Sent.</h1>
            <p className="mt-4">
              If that email address is in our system, you will receive an email
              with instructions about how to reset your password in a few
              minutes.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-4xl">Forgot Password.</h1>
            <p className="mt-4">
              Enter the email address associated with your account to receive a
              link to reset your password.
            </p>
          </>
        )}
        <Form
          method="post"
          noValidate
          className="pt-6 pb-8 mt-4 mb-4"
          onSubmit={onSubmit}
        >
          {submitError && (
            <div className="flex items-center justify-center mb-6 bg-zinc-500">
              <p className="m-4 text-s text-contrast">{submitError}</p>
            </div>
          )}
          <div className="mb-3">
            <input
              className="mb-1 appearance-none rounded dark:bg-transparent border focus:border-primary/50 focus:ring-0 w-full py-2 px-3 text-primary/90 placeholder:text-primary/50 leading-tight focus:shadow-outline border-primary/20"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              aria-label="Email address"
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            {!emailError ? (
              ""
            ) : (
              <p className={`text-red-500 text-xs`}>{emailError} &nbsp;</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-[#141414] text-white rounded py-2 px-4 focus:shadow-outline block w-full"
              type="submit"
            >
              Request Reset Link
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
