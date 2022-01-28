import React from 'react';
import { useAuth } from './hooks/auth.hook';
import { useHttp } from './hooks/http.hook';
import { AuthContext } from './context/AuthContext';
import { useRoutes } from './pages/routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { Loader } from './components';

function App() {
  const { request } = useHttp();
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  const [items, setItems] = React.useState([]);
  const [cart, setCart] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const items = await request('api/item', 'GET');
        setItems(items);
      } catch (e) {
        console.error(e, 'Ошибка при запросе товаров');
      }
    }
    fetchData();
  }, [request]);

  React.useEffect(() => {
    if (isAuthenticated) {
      async function fetchCart() {
        try {
          const cartRes = await request('api/user/cartItems', 'GET', null, {
            Authorization: `Bearer ${token}`,
          });
          setCart(cartRes[0].cart);
        } catch (e) {
          console.error(e, 'Ошибка при запросе корзины');
        }
      }

      async function fetchFavorites() {
        try {
          const favoritesRes = await request('api/user/favoriteItems', 'GET', null, {
            Authorization: `Bearer ${token}`,
          });
          setFavorites(favoritesRes[0].favorites);
        } catch (e) {
          console.error(e, 'Ошибка при запросе избранных товаров');
        }
      }

      async function fetchOrders() {
        try {
          const ordersRes = await request('api/user/orders', 'GET', null, {
            Authorization: `Bearer ${token}`,
          });
          setOrders(ordersRes[0].orders);
        } catch (e) {
          console.error(e, 'Ошибка при запросе корзины`');
        }
      }

      fetchCart();
      fetchFavorites();
      fetchOrders();
    }
  }, [token, request, isAuthenticated]);

  const addToCart = async (obj) => {
    try {
      const findItem = cart.find((item) => item._id === obj._id);
      if (findItem) {
        setCart((prev) => prev.filter((item) => item._id !== obj._id));
        await request('/api/user/removeFromCart', 'DELETE', obj, {
          Authorization: `Bearer ${token}`,
        });
      } else {
        setCart((prev) => [...prev, obj]);
        await request('/api/user/addToCart', 'PUT', obj, {
          Authorization: `Bearer ${token}`,
        });
      }
    } catch (e) {}
  };

  const addToFavorites = async (obj) => {
    try {
      const findItem = favorites.find((item) => item._id === obj._id);
      if (findItem) {
        setFavorites((prev) => prev.filter((item) => item._id !== obj._id));
        await request('/api/user/removeFromFavorites', 'DELETE', obj, {
          Authorization: `Bearer ${token}`,
        });
      } else {
        setFavorites((prev) => [...prev, obj]);
        await request('/api/user/addToFavorites', 'PUT', obj, {
          Authorization: `Bearer ${token}`,
        });
      }
    } catch (e) {}
  };

  const isAddedToCart = (id) => {
    return cart.some((obj) => obj._id === id);
  };

  const isAddedToFavorites = (id) => {
    return favorites.some((item) => item._id === id);
  };

  if (!ready) {
    return <Loader />;
  }

  return (
    <Router>
      <AuthContext.Provider
        value={{
          token,
          login,
          logout,
          userId,
          isAuthenticated,
          items,
          cart,
          favorites,
          orders,
          setCart,
          addToCart,
          setFavorites,
          addToFavorites,
          setOrders,
          isAddedToCart,
          isAddedToFavorites,
        }}>
        {routes}
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
