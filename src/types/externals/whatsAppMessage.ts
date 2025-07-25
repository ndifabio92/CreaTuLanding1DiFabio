import { Product } from "../products";

export interface WhatsAppMessage {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  products: Partial<Product>[];
}

export interface CartProductWithQuantity {
  product: Product;
  quantity: number;
}
