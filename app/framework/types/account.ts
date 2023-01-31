export type Order = {
  orderNumber: number;
  fulfillmentStatus: string;
  name: string;
  id: string;
  processedAt: string;
  totalPrice: {
    amount: number;
  };
};

export type Address = {
  address1: string;
  address2: string;
  city: string;
  company: string;
  country: string;
};
