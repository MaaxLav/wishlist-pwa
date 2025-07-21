import { useEffect, useState, type ReactNode } from "react";
import { FirebaseContext } from "./app";
import {
  collection,
  getFirestore,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import app from "./app";
import type { IWishListItem } from "../interfaces/wishlist";

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const db = getFirestore(app);
  const [wishes, setWishes] = useState<IWishListItem[]>([]);
  const wishlistCollection = collection(db, "wishlist");

  const getWishes = async () => {
    const wishlistSnapshot = await getDocs(wishlistCollection);
    const wishesDocs = wishlistSnapshot.docs.map((doc) =>
      doc.data()
    ) as IWishListItem[];

    console.log(wishesDocs);
    setWishes(wishesDocs);
  };

  const addWish = async (data: IWishListItem) => {
    const wishRef = await addDoc(wishlistCollection, data);
    await setDoc(doc(wishlistCollection, wishRef.id), {
      id: wishRef.id,
      ...data,
    });
    setWishes((pv) => [...pv, { ...data, id: wishRef.id }]);
    return wishRef;
  };

  const removeWish = async (wishId: string) => {
    await deleteDoc(doc(wishlistCollection, wishId));
    setWishes((pV) => pV.filter((i) => i.id !== wishId));
  };

  useEffect(() => {
      getWishes();
      enable
  }, []);

  const value = {
    wishes,
    addWish,
    removeWish,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};
