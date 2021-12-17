import React from 'react';
import { OrdersItem, Header } from '../components';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Orders() {
  const { orders } = React.useContext(AuthContext);

  const renderItems = () => {
    return orders.map((item, index) => <OrdersItem key={index} {...item} />);
  };

  return (
    <div className="wrapper">
      <Header />
      {orders.length !== 0 ? (
        <div className="content_wrapper">
          <div className="content">
            <div className="categories-search">
              <h2 className="label_text">история покупок</h2>
            </div>
            <div className="items-block">{renderItems()}</div>
          </div>
        </div>
      ) : (
        <div className="cart_block_empty">
          <div className="cart_empty">
            <h2>
              История покупок пуста <i>😕</i>
            </h2>
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

export default Orders;
