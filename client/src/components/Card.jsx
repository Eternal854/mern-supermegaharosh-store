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
    <div className="card">
      <Link className="text-decoration-none" to={`/${_id}`}>
        <div className="img_wrapper">
          <img src={imageUrl[0]} alt="Card" />
        </div>
        <div>
          <div className="card_title">{title}</div>
          <div className="item_price">{price} $</div>
        </div>
      </Link>
      <div className="favorite_heart">
        <img
          onClick={addToFavoritesHandler}
          src={isAddedToFavorites(_id) ? '/img/heart-liked.svg' : '/img/heart-unliked.png'}
          alt="AddToWishList"
        />
      </div>
    </div>
  );
}

export default Card;
