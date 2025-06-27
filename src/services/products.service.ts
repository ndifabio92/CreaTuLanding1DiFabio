import { Product } from "../types/products";
import { db } from "../config/firebase/config";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";

export const getAllProductsFromFirestore = async (): Promise<Product[]> => {
  const productsCol = collection(db, "products");
  const productsSnapshot = await getDocs(productsCol);
  return productsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
};

export const getProductByIdFromFirestore = async (
  id: string
): Promise<Product | null> => {
  const productDoc = doc(db, "products", id);
  const productSnap = await getDoc(productDoc);

  if (!productSnap.exists()) return null;
  return {
    id: productSnap.id,
    ...productSnap.data(),
  } as Product;
};

export const getProductsByBrandName = async (
  brandName: string
): Promise<Product[]> => {
  const productsCol = collection(db, "products");
  const q = query(productsCol, where("brands.name", "==", brandName));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
};

export const getProductsByActiveBrand = async (
  brandId: string
): Promise<Product[]> => {
  const productsCol = collection(db, "products");
  const q = query(
    productsCol,
    where("brands.id", "==", brandId),
    where("brands.active", "==", true)
  );
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
};
