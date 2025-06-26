import { Product } from "../products/products";

export interface WhatsAppMessage {
    name: string;
    lastName: string;
    email: string;
    phoneNumber: string
    products: Partial<Product>[];
}