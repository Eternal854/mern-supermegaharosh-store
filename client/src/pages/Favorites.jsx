import React from 'react';
import { Card, Header } from '../components';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Favorites() {
  const { favorites } = React.useContext(AuthContext);

  const renderItems = () => {
    return favorites.map((item, index) => <Card key={index} addToCart {...item} />);
  };

  return (
    <div className="wrapper">
      <Header />
      {favorites.length !== 0 ? (
        <div className="content_wrapper">
          <div className="content">
            <div className="categories-search">
              <h2 className="label_text">Сохраненные товары</h2>
            </div>
            <div className="items-block">{renderItems()}</div>
          </div>
        </div>
      ) : (
        <div className="cart_block_empty">
          <div className="cart_empty">
            <h2>
              У вас нет сохраненных товаров <i>😕</i>
            </h2>
            <p>
              Чтобы добавить товар, вернитесь на главную страницу.
              <br />
            </p>
            <img src="/img/empty-cart.png" alt="EmptyCart" />
            <Link to="/" className="">
              <button className="button">Вернуться на главную</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Favorites;
