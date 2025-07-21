import { useEffect, useState, type ReactNode } from "react";
import { FirebaseContext } from "./app";
import {
  doc,
  where,
  query,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./app";
import type { IWishListItem } from "../interfaces/wishlist";

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const wishlistCollection = collection(db, "wishlist");
  const [wishes, setWishes] = useState<IWishListItem[]>([]);

  const getWishes = async () => {
    const wishlistSnapshot = await getDocs(wishlistCollection);
    const wishesDocs = wishlistSnapshot.docs.map((doc) =>
      doc.data()
    ) as IWishListItem[];

    setWishes(wishesDocs);
  };

  const addWish = async (data: IWishListItem) => {
    const wishRef = await addDoc(wishlistCollection, {
      ...data,
      id: Date.now(),
    });
    await setDoc(doc(wishlistCollection, wishRef.id), {
      id: wishRef.id,
      ...data,
    });
  };

  const removeWish = async (wishId: string) => {
    const q = query(wishlistCollection, where("id", "==", wishId));
    const res = await getDocs(q);
    if (res.docs.length) {
      const docId = res.docs[0].id;
      await deleteDoc(doc(wishlistCollection, docId));
    }
  };

  const listenToRealtimeData = () => {
    onSnapshot(
      wishlistCollection,
      { includeMetadataChanges: true },
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const source = snapshot.metadata.fromCache ? "local cache" : "server";
          const data = change.doc.data();
          if (import.meta.env.DEV) {
            console.log("Data came from " + source, data);
          }

          if (change.type === "added") {
            setWishes((pv) => [
              ...pv,
              { ...data, id: data.id } as IWishListItem,
            ]);
          }
          if (change.type === "removed") {
            setWishes((pV) => pV.filter((i) => i.id !== data.id));
          }
        });
      }
    );
  };

  useEffect(() => {
    listenToRealtimeData();
    getWishes();
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
