import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase/config";
import { Categories } from "../types/categories";

export const getAllCategoriesFromFirestore = async (): Promise<
  Categories[]
> => {
  const categoriesCol = collection(db, "categories");
  const categoriesSnapshot = await getDocs(categoriesCol);
  return categoriesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Categories[];
};
