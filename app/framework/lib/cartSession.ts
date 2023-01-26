import { createCookieSessionStorage } from "@remix-run/node";
import { config } from "..";

const ONE_DAY = 60 * 60 * 24;

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "cart",
      maxAge: ONE_DAY,
      path: "/",
    },
  });

export { getSession, commitSession, destroySession };
