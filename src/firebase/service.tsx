import type { IWishListItem } from "../interfaces/wishlist";

const API_URL = import.meta.env.VITE_FIREBASE_DATABASE_URL;

export const getWishes = () => {
  return fetch(API_URL + "wishlist.json").then((d) => d.json());
};
export const addWish = (item: IWishListItem) => {
  return fetch(API_URL + "wishlist.json", {
    method: "POST",
    body: JSON.stringify(item),
  }).then((d) => d.json());
};
export const removeWish = (itemId: string) => {
  return fetch(API_URL + `wishlist/${itemId}.json`, { method: "DELETE" }).then(
    (d) => d.json()
  );
};
