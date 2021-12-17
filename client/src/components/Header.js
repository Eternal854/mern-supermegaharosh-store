import React from 'react';
import { Link } from 'react-router-dom';

import { UserDropdown } from '.';

function Header() {
  return (
    <div className="header">
      <div className="header-middle">
        <Link to="/">
          <div className="logo">
            <h3>supermegaharosh</h3>
            <p>store</p>
          </div>
        </Link>
        <div className="cart-block">
          <Link to="/cart">
            <img className="cart-icon" src="/img/cart-icon.svg" alt="Cart" />
          </Link>
          <Link to="/favorites">
            <img className="cart-icon" src="/img/favorites-icon.svg" alt="Favorites" />
          </Link>
          <UserDropdown />
        </div>
      </div>
    </div>
  );
}
export default Header;
