export type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: null | number;
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
