export interface Edge<T> {
  edges: {
    node: T;
  }[];
}

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type StoreFrontData = {
  collections: {
    title: string;
    handle: string;
    image: Image;
  }[];
  pages: {
    handle: string;
    title: string;
  }[];
  shop: {
    name: string;
  };
  footerCompany: Menu;
  footerShop: Menu;
  footerSocial: Menu;
  menu: Menu;
};

export type Menu = {
  items: {
    title: string;
    handle: string;
  }[];
};
export type Price = {
  amount: number;
  currencyCode: string;
};

export type LocalizationResponse = {
  localization: {
    availableCountries: Country[];
  };
};

export type Country = {
  isoCode: string;
  name: string;
  currency: {
    isoCode: string;
  }[];
};
