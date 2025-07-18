export interface IWishListItem {
  id?: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
}
export interface IWishList {
  items: IWishListItem[];
  totalItems: number;
  totalPrice: number;
}
