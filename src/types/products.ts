import { Brands } from "./brands";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  urls: string[];
  category: string[];
  stock: number;
  isNew: boolean;
  brands: Brands;
}
