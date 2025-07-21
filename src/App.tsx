import { useContext, type FormEvent } from "react";
import "./styles/App.css";
import type { IWishListItem } from "./interfaces/wishlist";
import logo from "./assets/logo.svg";
import { FirebaseContext } from "./firebase/app";

function App() {
  const { wishes, addWish, removeWish } = useContext(FirebaseContext);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newWish = Object.fromEntries(formData) as unknown as IWishListItem;
    try {
      await addWish(newWish);
    } catch (error) {
      console.error(error);
    }
  };

  const removeItemHandler = async (item: IWishListItem) => {
    await removeWish(item.id as string);
  };

  return (
    <section className="app">
      <header className="app-header">
        <img src={logo} />
      </header>
      <main className="app-main">
        <h5>Add New Wish</h5>
        <form className="app-main__form" onSubmit={handleFormSubmit}>
          <div className="app-main__form__body-wrapper">
            <fieldset className="app-main__form__body">
              <label htmlFor="name">Product Name</label>
              <input
                required
                type="text"
                name="name"
                placeholder="Enter Product Name"
              />
              <label htmlFor="price">Product Price</label>
              <input
                required
                type="number"
                name="price"
                placeholder="Enter Product Price"
              />
            </fieldset>
            <fieldset className="app-main__form__body">
              <label htmlFor="imageUrl">Product Image URL</label>
              <input
                required
                type="url"
                name="imageUrl"
                placeholder="Enter Product Img URL"
              />
              <label htmlFor="description">Product Description</label>
              <textarea
                rows={3}
                maxLength={300}
                name="description"
                placeholder="Enter Product Name"
              />
            </fieldset>
          </div>
          <button type="submit">Add Wish</button>
        </form>
        <div className="app-main__list">
          {!wishes.length && "No wish items"}
          {wishes.map((item: IWishListItem) => (
            <div className="app-main__list-item" key={item.id}>
              <div className="app-main__list-item__image-container">
                <img src={item.imageUrl} />
              </div>
              <div className="app-main__list-item__content">
                <div className="app-main__list-item__content-info">
                  <div>{item.id}$</div>
                  <div>{item.price}$</div>
                  <div>{item.name}</div>
                  <div>{item.description}</div>
                </div>
                <button
                  className="app-main__list-item__content-remove-action"
                  onClick={() => removeItemHandler(item)}
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="app-footer">
        <p>&copy; 2025 Wishlist PWA ML</p>
        <p>All Rights Reserved</p>
      </footer>
    </section>
  );
}

export default App;
