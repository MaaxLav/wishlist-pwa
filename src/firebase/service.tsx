import type { IWishListItem } from "../interfaces/wishlist";

const API_URL =
  "https://wishlist-pwa-default-rtdb.europe-west1.firebasedatabase.app/";

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
