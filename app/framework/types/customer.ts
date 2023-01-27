export type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: null | number;
  accessToken: string;
};

export type CustomerResponse = {
  customer: Customer;
};

export type TokenResponse = {
  customerAccessTokenCreate: {
    customerAccessToken: {
      accessToken: string;
    };
  };
};
