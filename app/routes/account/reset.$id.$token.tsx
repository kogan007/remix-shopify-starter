import { type ActionArgs, json, type LoaderArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useState } from "react";
import { config } from "~/framework";

export function loader({ params, request }: LoaderArgs) {
  const { id, token } = params;
  if (!id || !token) return json(null, { status: 404 });
  return null;
}

export async function action({ params, request }: ActionArgs) {
  const { id, token } = params;
  if (!id || !token) return json(null, { status: 400 });
  const body = await request.formData();
  const password = body.get("password");
  if (typeof password !== "string") return json(null, { status: 400 });
  const data = await config.operations.auth.confirmRecover(id, token, password);
  console.log({ data });
  return null;
}

export default function AccountPasswordResetForm() {
  const [submitError, setSubmitError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [passwordConfirmError, setPasswordConfirmError] = useState<
    string | null
  >(null);

  function passwordValidation(form: any) {
    setPasswordError(null);
    setPasswordConfirmError(null);

    let hasError = false;

    if (!form.password.validity.valid) {
      hasError = true;
      setPasswordError(
        form.password.validity.valueMissing
          ? "Please enter a password"
          : "Passwords must be at least 6 characters"
      );
    }

    if (!form.passwordConfirm.validity.valid) {
      hasError = true;
      setPasswordConfirmError(
        form.password.validity.valueMissing
          ? "Please re-enter a password"
          : "Passwords must be at least 6 characters"
      );
    }

    if (password !== passwordConfirm) {
      hasError = true;
      setPasswordConfirmError("The two password entered did not match.");
    }

    return hasError;
  }

  async function onSubmit(event: any) {
    event.preventDefault();

    if (passwordValidation(event.currentTarget)) {
      return;
    }
  }

  return (
    <div className="flex justify-center my-24 px-4">
      <div className="max-w-md w-full">
        <h1 className="text-4xl">Reset Password.</h1>
        <p className="mt-4">Enter a new password for your account.</p>
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
              className="mb-1 appearance-none rounded dark:bg-transparent border focus:border-primary/50 focus:ring-0 w-full py-2 px-3 text-primary/90 placeholder:text-primary/50 leading-tight focus:shadow-outline border-primary"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              aria-label="Password"
              autoFocus
              value={password}
              minLength={8}
              required
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <p
              className={`text-red-500 text-xs ${
                !passwordError ? "invisible" : ""
              }`}
            >
              {passwordError} &nbsp;
            </p>
          </div>
          <div className="mb-3">
            <input
              className="mb-1 appearance-none rounded dark:bg-transparent border focus:border-primary/50 focus:ring-0 w-full py-2 px-3 text-primary/90 placeholder:text-primary/50 leading-tight focus:shadow-outline border-primary"
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              autoComplete="current-password"
              placeholder="Re-enter password"
              aria-label="Re-enter password"
              value={passwordConfirm}
              required
              minLength={8}
              onChange={(event) => {
                setPasswordConfirm(event.target.value);
              }}
            />
            <p
              className={`text-red-500 text-xs ${
                !passwordConfirmError ? "invisible" : ""
              }`}
            >
              {passwordConfirmError} &nbsp;
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-[#141414] text-white rounded py-2 px-4 focus:shadow-outline block w-full"
              type="submit"
            >
              Save
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
