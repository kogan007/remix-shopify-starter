import {
  type MetaFunction,
  type LinksFunction,
  type LoaderArgs,
  defer,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Layout } from "./components/Common";
import { config } from "./framework";

import styles from "./tailwind.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request }: LoaderArgs) {
  const shopInfoPromise = config.operations.getStoreFrontData();
  const cartPromise = config.operations.cart.getCart(request);
  const userPromise = config.operations.auth.getLoggedInUser(request);
  const localizationPromise = config.operations.getLocalizations();
  const [
    { shop, collections, menu, footerCompany, footerShop, footerSocial },
    cart,
    customer,
  ] = await Promise.all([shopInfoPromise, cartPromise, userPromise]);
  return defer({
    shop,
    collections,
    menu,
    footerCompany,
    footerShop,
    footerSocial,
    cart,
    customer,
    localizationPromise,
  });
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
