import fetch from "./lib/fetch";
import getStoreFrontData from "./operations/getStoreFrontData";
import getProducts from "./operations/getProducts";
import getProduct from "./operations/getProduct";
import cart from "./operations/cart";
import auth from "./operations/auth";
import getCollection from "./operations/getCollection";

const API_URL = process.env.API_URL;
const STOREFRONT_API_TOKEN = process.env.STOREFRONT_API_TOKEN;

if (!API_URL) {
  throw new Error("No api url");
}

if (!STOREFRONT_API_TOKEN) {
  throw new Error("No api token");
}
const ONE_DAY = 60 * 60 * 24;

const operations = {
  getStoreFrontData,
  getProducts,
  getProduct,
  cart,
  auth,
  getCollection,
};

export const config = {
  commerceUrl: API_URL,
  apiToken: STOREFRONT_API_TOKEN,
  customerCookie: "SHOPPER_S",
  cartCookie: "cart",
  cartCookieMaxAge: ONE_DAY * 30,
  fetch,
  operations,
};
