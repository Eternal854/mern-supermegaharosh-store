import React, { useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header, Loader } from '../components';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';

function DetailPage() {
  const { addToCart, addToFavorites, isAddedToCart, isAddedToFavorites } =
    React.useContext(AuthContext);

  const { loading, request } = useHttp();
  const itemId = useParams().id;
  const [item, setItem] = useState(null);

  const getItem = useCallback(async () => {
    try {
      const fetched = await request(`/api/item/${itemId}`, 'GET', null);
      setItem(fetched);
      console.log(fetched.imageUrl);
    } catch (e) {}
  }, [itemId, request]);

  useEffect(() => {
    getItem();
  }, [getItem]);

  const addToCartHandler = () => {
    addToCart(item);
  };

  const addToFavoritesHandler = () => {
    addToFavorites(item);
  };

  return (
    <div className="wrapper">
      <Header />
      <div className="content_wrapper">
        <div className="content">
          {loading && <Loader />}
          {!loading && item && (
            <>
              <div className="detail_title">{item.title}</div>
              <div className="detail_price">{item.price} $</div>
              {/* <img className="detail_img" src={`../${item.imageUrl}`} alt="Item" /> */}
              <div className="favorite_heart">
                <img
                  onClick={addToFavoritesHandler}
                  src={
                    isAddedToFavorites(item._id) ? '/img/heart-liked.svg' : '/img/heart-unliked.png'
                  }
                  alt="AddToWishList"
                />
              </div>
              {isAddedToCart(item._id) ? (
                <button className="cart_remove_button_detail" onClick={addToCartHandler}>
                  удалить из корзины
                </button>
              ) : (
                <button className="cart_add_button_detail" onClick={addToCartHandler}>
                  добавить в корзину
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
