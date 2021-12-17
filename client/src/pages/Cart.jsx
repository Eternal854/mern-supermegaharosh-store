import React from 'react';
import { Header, CartItem } from '../components';
import { AuthContext } from '../context/AuthContext';
import { useAuth } from '../hooks/auth.hook';
import { useHttp } from '../hooks/http.hook';
import { Link } from 'react-router-dom';

function Cart() {
  const { cart, setCart, setOrders } = React.useContext(AuthContext);
  const { request } = useHttp();
  const { token } = useAuth();

  const [orderIsComplete, setOrderIsComplete] = React.useState(false);

  const getTotalPrice = () => cart.reduce((sum, obj) => obj.price + sum, 0);

  const renderItems = () => {
    return cart.map((item, index) => <CartItem key={index} addToCart {...item} />);
  };

  const clearCart = async () => {
    try {
      setCart([]);
      await request('/api/user/clearCart', 'DELETE', null, {
        Authorization: `Bearer ${token}`,
      });
    } catch (e) {}
  };

  const addToOrders = async () => {
    try {
      setOrders((prev) => [...prev, cart]);
      await request('/api/user/addToOrders', 'PUT', cart, {
        Authorization: `Bearer ${token}`,
      });
    } catch (e) {}
  };

  const completeOrderHandler = () => {
    addToOrders();
    clearCart();
    setOrderIsComplete(true);
  };

  return (
    <div className="wrapper">
      <Header />
      {cart.length !== 0 ? (
        <div className="cart_block">
          <div className="cart_wrapper">
            <div className="categories-search">
              <h2 className="label_text">Корзина</h2>
            </div>
            <div className="cart-content">{renderItems()}</div>
          </div>
          <div className="accept_block">
            <div className="accept_block_content_wrapper">
              <div className="total_price_block">
                <span className="text_label">Всего</span>
                <span className="text_price">{getTotalPrice()} $</span>
              </div>
              <button onClick={completeOrderHandler} className="button">
                оформить заказ
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="cart_block_empty">
          <div className="cart_empty">
            <h2>{orderIsComplete ? 'Заказ оформлен' : 'Корзина пуста'}</h2>
            <p>
              {!orderIsComplete && 'Чтобы добавить товар, вернитесь на главную страницу.'}
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

export default Cart;
