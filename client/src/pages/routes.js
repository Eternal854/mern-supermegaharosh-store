import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Home, Cart, Favorites, Orders, DetailPage } from './';
export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/cart" exact>
          <Cart />
        </Route>
        <Route path="/favorites" exact>
          <Favorites />
        </Route>
        <Route path="/orders" exact>
          <Orders />
        </Route>
        <Route path="/:id">
          <DetailPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/cart" exact>
        <Cart />
      </Route>
      <Route path="/favorites" exact>
        <Favorites />
      </Route>
      <Route path="/:id">
        <DetailPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
