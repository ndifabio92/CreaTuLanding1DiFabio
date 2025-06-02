import { mockProducts } from "../data/mocks";
import { Product } from "../types/products/products";

export const productsService = {
  getProducts: async (): Promise<Product[]> => {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockProducts);
        }, 3000);
      });
    } catch (error) {
      throw new Error("Error al cargar los productos");
    }
  },
};
