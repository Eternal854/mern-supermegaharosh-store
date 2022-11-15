import React from 'react';
import { AuthContext } from '../context/AuthContext';

function CartItem({ _id, title, price, imageUrl, size }) {
  const { addToCart, addToFavorites } = React.useContext(AuthContext);
  const obj = { _id, title, price, imageUrl, size };

  const addToCartHandler = () => {
    addToCart(obj);
  };

  const addToFavoritesHandler = () => {
    addToFavorites(obj);
  };

  return (
    <div className="cart_item">
      <img className="cart_item_image" src={imageUrl[0]} alt="CartItem" />
      <div className="title_button_block">
        <div className="title_size_block">
          <div className="info">
            <div className="cart_item_title">{title}</div>
            <div className="cart_item_size">{'Размер ' + size}</div>
          </div>
          <div className="price_text">{price + ' $'}</div>
          <img
            onClick={addToCartHandler}
            className="remove_button"
            src="/img/remove-cart-item.svg"
            alt="RemoveItem"
          />
        </div>
      </div>
    </div>
  );
}

export default CartItem;
