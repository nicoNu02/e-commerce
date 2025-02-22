import { Product, Image, Color, Category } from "@prisma/client";

export interface ProductType extends Product {
  images: Image[];
  colors: Color[];
}

export interface GetProductsByCategoryResponse {
  category: Category;
  category_id: string;
  product: ProductType;
  product_id: string;
}
export interface ImageType {
  id: string;
  url: string;
  product_id: string;
}

export interface ColorType {
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
export interface Cart extends Product {
  image: Image;
  color: Color;
  count: number;
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
