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

export interface Cart {
  id: string;
  count: number;
  name: string;
  color: string;
  price: number;
  url: string;
}
