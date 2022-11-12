import React, { useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header, Loader } from '../components';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';

const sizes = [39, 40, 41, 42, 43, 44, 45, 46];

function DetailPage() {
  const { addToCart, addToFavorites, isAddedToCart, isAddedToFavorites } =
    React.useContext(AuthContext);

  const { loading, request } = useHttp();
  const itemId = useParams().id;
  const [item, setItem] = useState(null);

  const [currentImg, setCurrentImg] = useState(null);

  const [shoeSize, setShoeSize] = useState(null);

  const getItem = useCallback(async () => {
    try {
      const fetched = await request(`/api/item/${itemId}`, 'GET', null);
      setItem(fetched);
      setCurrentImg(fetched.imageUrl[0]);
    } catch (e) {}
  }, [itemId, request]);

  useEffect(() => {
    getItem();
  }, [getItem]);

  const addToCartHandler = () => {
    const obj = {
      ...item,
      size: shoeSize,
    };
    addToCart(obj);
  };

  const addToFavoritesHandler = () => {
    addToFavorites(item);
  };

  const selectShoeSize = (index) => {
    setShoeSize(sizes[index]);
  };

  return (
    <div className="wrapper">
      <Header />
      <div className="content_wrapper">
        <div className="content">
          <div className="item_content">
            {loading && <Loader />}
            {!loading && item && (
              <>
                <div>
                  {item.imageUrl.map((img, index) => (
                    <div>
                      <img
                        onClick={() => setCurrentImg(img)}
                        key={index}
                        className="detail_img"
                        src={`../${img}`}
                        alt="Item"
                      />
                    </div>
                  ))}
                </div>
                <img className="currentImg" src={`../${currentImg}`} alt="current" />
                <div className="item_details">
                  <div className="detail_title">{item.title}</div>
                  <div className="detail_price">{item.price} $</div>
                  <p>Описание товара</p>
                  <div className="detail_description">{item.description}</div>
                  <div className="buttons">
                    <div className="detail_sizes">
                      <ul>
                        {sizes.map((size, index) => (
                          <li
                            key={size}
                            onClick={() => selectShoeSize(index)}
                            className={shoeSize === sizes[index] && 'active'}>
                            {size}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="add_buttons">
                      {isAddedToCart(item._id) ? (
                        <button className="cart_remove_button_detail" onClick={addToCartHandler}>
                          удалить из корзины
                        </button>
                      ) : (
                        <button
                          disabled={shoeSize === null}
                          className="cart_add_button_detail"
                          onClick={addToCartHandler}>
                          добавить в корзину
                        </button>
                      )}
                      <div className="favorite_heart">
                        <img
                          onClick={addToFavoritesHandler}
                          src={
                            isAddedToFavorites(item._id)
                              ? '/img/heart-liked.svg'
                              : '/img/heart-unliked.png'
                          }
                          alt="AddToWishList"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
