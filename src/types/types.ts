export interface Product {
  id: string;
  name: string;
  description: string;
  colors?: string | null;
  price: number;
  itemsLeft: number | null;
}
export interface Image {
  id: string;
  url: string;
  product_id: string;
}

export interface Color {
  id: string;
  name: string;
  code: string;
  product_id: string;
}
export interface Method {
  id: number;
  title: string;
  details: string;
  price: number;
}
export interface Cart {
  id: string;
  count: number;
  name: string;
  color: string;
  price: number;
  url: string;
}

export interface FormCheckout {
  shipping: {
    email: string;
    name: string;
    lastName: string;
    dni: string;
    phoneNumber: string;
    address: string;
    houseNumber: string;
    floor?: string;
    city: string;
    apartment?: string;
    province: string;
    shippingId: number;
    shippingMethod: string;
    shippingDetails?: string;
    shippingPrice?: number | undefined;
  };

  payment?: {
    paymentMethod: string;
    totalPrice: number | undefined;
  };
  notes?: string;
  stage?: string;
  paid?: boolean;
  complete?: boolean;
}
