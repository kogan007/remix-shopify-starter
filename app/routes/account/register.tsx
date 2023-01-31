import type { ActionArgs } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { useState } from "react";
import { config } from "~/framework";

export function action({ request }: ActionArgs) {
  return config.operations.auth.register(request);
}
export default function Register() {
  return <AccountCreateForm />;
}

function emailValidation(email: any) {
  if (email.validity.valid) return null;

  return email.validity.valueMissing
    ? "Please enter an email"
    : "Please enter a valid email";
}

function passwordValidation(password: any) {
  if (password.validity.valid) return null;

  if (password.validity.valueMissing) {
    return "Please enter a password";
  }

  return "Password must be at least 6 characters";
}

function AccountCreateForm() {
  const [submitError, setSubmitError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  async function onSubmit(event: any) {
    setEmailError("");
    setPasswordError("");
    setSubmitError("");

    const newEmailError = emailValidation(event.currentTarget.email);
    if (newEmailError) {
      setEmailError(newEmailError);
    }

    const newPasswordError = passwordValidation(event.currentTarget.password);
    if (newPasswordError) {
      setPasswordError(newPasswordError);
    }

    if (newEmailError || newPasswordError) {
      return;
    }
  }

  return (
    <div className="flex justify-center my-24 px-4">
      <div className="max-w-md w-full">
        <h1 className="text-4xl">Create an Account.</h1>
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
          <div className="mb-3">
            <input
              className="mb-1 appearance-none rounded dark:bg-transparent border focus:border-primary/50 focus:ring-0 w-full py-2 px-3 text-primary/90 placeholder:text-primary/50 leading-tight focus:shadow-outline border-primary"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              aria-label="Password"
              value={password}
              minLength={8}
              required
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            {!passwordError ? (
              ""
            ) : (
              <p className={`text-red-500 text-xs`}>{passwordError} &nbsp;</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-[#141414] text-white rounded py-2 px-4 focus:shadow-outline block w-full"
              type="submit"
            >
              Create Account
            </button>
          </div>
          <div className="flex items-center mt-4">
            <p className="align-baseline text-sm">
              Already have an account? &nbsp;
              <Link className="inline underline" to="/account">
                Sign in
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}
