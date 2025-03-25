export interface OrderPayloadType {
  variants: { variant_id: string; quantity: number }[];
  shipping_address: {
    first_name: string;
    last_name: string;
    address1: string;
    phone: string;
    city: string;
    province: string;
    country: string;
    zip: string;
  };
  billing_address: {
    first_name: string;
    last_name: string;
    address1: string;
    phone: string;
    city: string;
    province: string;
    country: string;
    zip: string;
  };
  razor_pay_id?: string;
  shippingCharges: number;
  codCharges?: number;
  customerInfo: {
    first_name?: string;
    last_name?: string;
    email: string;
    phone?: string;
  };
  note?: string;
  discount_codes?: {
    code: string;
    amount: string;
    type: string;
  }[];
  total_price: number;
}
