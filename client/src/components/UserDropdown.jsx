import React, { useContext, useEffect, useState, useRef } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { useMessage } from '../hooks/message.hook';
import { Link, useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

function UserDropdown() {
  const history = useHistory();
  const { isAuthenticated, login, logout, setCart, setFavorites } = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [authMode, setAuthMode] = useState(false);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandle = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandle = async () => {
    try {
      const data = await request('api/user/register', 'POST', { ...form });
      message(data.message);
    } catch (e) {}
  };

  const loginHandle = async () => {
    try {
      const data = await request('api/user/login', 'POST', { ...form });
      login(data.token, data.userId);
    } catch (e) {}
  };

  const logoutHandle = (event) => {
    event.preventDefault();
    logout();
    history.push('/');
    setCart([]);
    setFavorites([]);
  };

  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const userDropdownRef = useRef(null);

  const mouseOutsideHandle = (event) => {
    const path = event.composedPath && event.composedPath();
    if (userDropdownRef.current && !path.includes(userDropdownRef.current)) {
      setDropdownIsOpen(false);
    }
  };

  const dropdownToggle = () => {
    setDropdownIsOpen(!dropdownIsOpen);
  };

  const authModeToggle = () => {
    setAuthMode(!authMode);
  };

  React.useEffect(() => {
    document.body.addEventListener('mousedown', mouseOutsideHandle);
  }, []);

  return (
    <div ref={userDropdownRef} className="user">
      <img onClick={dropdownToggle} className="cart-icon" src="/img/user-icon.svg" alt="User" />
      <CSSTransition
        in={dropdownIsOpen}
        timeout={300}
        classNames="user_dropdown_wrapper"
        unmountOnExit
        onEnter={() => setDropdownIsOpen(true)}
        onExited={() => setDropdownIsOpen(false)}>
        <div className="user_dropdown_wrapper">
          <div className="user_dropdown_content">
            {isAuthenticated ? (
              <>
                <Link to="/orders">
                  <button disabled={loading} className="menu_button">
                    Мои покупки
                  </button>
                </Link>

                <button onClick={logoutHandle} disabled={loading} className="menu_button">
                  Выход
                </button>
              </>
            ) : (
              <>
                <h3>{authMode ? 'Регистрация' : 'Вход'}</h3>
                <div className="input_block">
                  <div className="input_group">
                    <input
                      onChange={changeHandle}
                      placeholder="Email"
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                    />
                  </div>
                  <div className="input_group">
                    <input
                      onChange={changeHandle}
                      placeholder="Пароль"
                      id="password"
                      name="password"
                      type="password"
                      value={form.password}
                    />
                  </div>
                </div>
                <div className="buttonfield_auth">
                  <button
                    disabled={loading}
                    onClick={!authMode ? loginHandle : registerHandle}
                    className="button">
                    {!authMode ? 'Войти' : 'Зарегистрироваться'}
                  </button>
                </div>
                <div className="auth_toggler">
                  <span onClick={authModeToggle}>{authMode ? 'Вход' : 'Регистрация'}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}

export default UserDropdown;
