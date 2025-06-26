// import { mockProducts } from "../data/mocks";
import { Product } from "../types/products/products";
import { db } from "../config/firebase/config";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

// MOCK
// export const productsService = {
//   getProducts: async (): Promise<Product[]> => {
//     try {
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           resolve(mockProducts);
//         }, 3000);
//       });
//     } catch (_error) {
//       throw new Error("Error al cargar los productos");
//     }
//   },
// };

export const getAllProductsFromFirestore = async (): Promise<Product[]> => {
  const productsCol = collection(db, "products");
  const productsSnapshot = await getDocs(productsCol);
  return productsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[]
};

export const getProductByIdFromFirestore = async (id: string): Promise<Product | null> => {
  const productDoc =doc(db, "products", id);
  const productSnap = await getDoc(productDoc);
  
  if (!productSnap.exists()) return null;
  return {
    id: productSnap.id,
    ...productSnap.data(),
  } as Product;
};
