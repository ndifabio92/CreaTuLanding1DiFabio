import { collection, getDocs } from "firebase/firestore";
import { Brands } from "../types/brands";
import { db } from "../config/firebase/config";

export const getAllBrandsFromFirestore = async (): Promise<Brands[]> => {
    const brandsCol = collection(db, "brands");
    const brandsSnapshot = await getDocs(brandsCol);
    return brandsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })) as Brands[]

}
