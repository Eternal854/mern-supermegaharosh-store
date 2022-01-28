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
  const userDropdownRef = useRef();

  const mouseOutsideHandle = (event) => {
    const path = event.composedPath && event.composedPath();
    path.includes(userDropdownRef.current) ? setDropdownIsOpen(true) : setDropdownIsOpen(false);
  };

  React.useEffect(() => {
    document.body.addEventListener('mouseover', mouseOutsideHandle);
  }, []);

  return (
    <div ref={userDropdownRef} className="user">
      <img className="cart-icon" src="/img/user-icon.svg" alt="User" />
      <CSSTransition
        in={dropdownIsOpen}
        timeout={2000}
        classNames="user_dropdown_wrapper"
        mountOnEnter
        unmountOnExit
        onEnter={() => setDropdownIsOpen(true)}
        onExited={() => setDropdownIsOpen(false)}>
        <>
          {dropdownIsOpen && (
            <div className="user_dropdown_wrapper">
              <div className="user_dropdown_top" />
              <div className="user_dropdown_content">
                {isAuthenticated ? (
                  <>
                    <div className="buttonfield_auth">
                      <Link to="/orders">
                        <button disabled={loading} className="button">
                          мои покупки
                        </button>
                      </Link>
                    </div>
                    <div className="buttonfield_auth">
                      <button onClick={logoutHandle} disabled={loading} className="button">
                        выход
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="field_auth">
                      <label className="input_label">email</label>
                      <div className="input_wrapper">
                        <input
                          onChange={changeHandle}
                          id="email"
                          name="email"
                          type="text"
                          value={form.email}
                          className="email_textbox"></input>
                      </div>
                    </div>
                    <div className="field_auth">
                      <label className="input_label">пароль</label>
                      <div className="input_wrapper">
                        <input
                          onChange={changeHandle}
                          id="password"
                          name="password"
                          type="password"
                          value={form.password}
                          className="email_textbox"></input>
                      </div>
                    </div>
                    <div className="buttonfield_auth">
                      <button onClick={loginHandle} disabled={loading} className="button">
                        вход
                      </button>
                    </div>
                    <div className="buttonfield_auth">
                      <button onClick={registerHandle} disabled={loading} className="button">
                        регистрация
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </>
      </CSSTransition>
    </div>
  );
}

export default UserDropdown;
