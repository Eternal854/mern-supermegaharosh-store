import React from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Card({ _id, title, price, imageUrl }) {
  const { addToCart, addToFavorites, isAddedToCart, isAddedToFavorites } =
    React.useContext(AuthContext);
  const obj = { _id, title, price, imageUrl };
  console.log(obj);

  const addToCartHandler = () => {
    addToCart(obj);
  };

  const addToFavoritesHandler = () => {
    addToFavorites(obj);
  };

  return (
    <Link className="text-decoration-none" to={`/${_id}`}>
      <div className="card">
        <img className="card_image" src={imageUrl[0]} alt="Card" />
        <div className="card_title">{title}</div>
        <div className="favorite_heart">
          <img
            onClick={addToFavoritesHandler}
            src={isAddedToFavorites(_id) ? '/img/heart-liked.svg' : '/img/heart-unliked.png'}
            alt="AddToWishList"
          />
        </div>
        <div className="buttonsBlock">
          <div className="item_price">{price} $</div>
          {isAddedToCart(_id) ? (
            <button className="cart_remove_button" onClick={addToCartHandler}>
              удалить
            </button>
          ) : (
            <button className="cart_add_button" onClick={addToCartHandler}>
              в корзину
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}

export default Card;
