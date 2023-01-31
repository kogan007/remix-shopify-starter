import fetch from "./lib/fetch";
import getStoreFrontData from "./operations/getStoreFrontData";
import getProducts from "./operations/getProducts";
import getProduct from "./operations/getProduct";
import cart from "./operations/cart";
import auth from "./operations/auth";
import getCollection from "./operations/getCollection";
import getPage from "./operations/getPage";
import checkout from "./operations/checkout";
import getLocalizations from "./operations/getLocalizations";
import account from "./operations/account";
import getProductRecommendations from "./operations/getProductRecommendations";

const API_URL = process.env.API_URL;
const STOREFRONT_API_TOKEN = process.env.STOREFRONT_API_TOKEN;
const SHOP_NAME = process.env.SHOP_NAME;

if (!SHOP_NAME) {
  throw new Error("Shop name not provided");
}

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
  checkout,
  account,
  getCollection,
  getPage,
  getLocalizations,
  getProductRecommendations,
};

export const config = {
  shopName: SHOP_NAME,
  commerceUrl: API_URL,
  apiToken: STOREFRONT_API_TOKEN,
  customerCookie: "SHOPPER_S",
  cartCookie: "cart",
  cartCookieMaxAge: ONE_DAY * 30,
  fetch,
  operations,
};
