import React from 'react';
import { AuthContext } from '../context/AuthContext';

function CartItem({ _id, title, price, imageUrl }) {
  const { addToCart, addToFavorites, isAddedToFavorites } = React.useContext(AuthContext);
  const obj = { _id, title, price, imageUrl };

  const addToCartHandler = () => {
    addToCart(obj);
  };

  const addToFavoritesHandler = () => {
    addToFavorites(obj);
  };

  return (
    <div className="cart_item">
      <img className="cart_item_image" src={imageUrl} alt="CartItem" />
      <div className="title_button_block">
        <div className="price_text">{price} $</div>
        <div className="cart_item_title">{title}</div>
        <div className="button_block">
          <div className="favorite_heart">
            <img
              onClick={addToFavoritesHandler}
              src={isAddedToFavorites(_id) ? '/img/heart-liked.svg' : '/img/heart-unliked.png'}
              alt="AddToWishList"
            />
          </div>
        </div>
      </div>
      <img
        onClick={addToCartHandler}
        className="remove_button"
        src="/img/remove-cart-item.svg"
        alt="RemoveItem"
      />
    </div>
  );
}

export default CartItem;
