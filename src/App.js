import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router";
import { Redirect } from "react-router-dom";
import { Theme, Modal } from "react-daisyui";

import { mealsActions } from "./Store/mealsSlice";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import Managment from "./components/ConfigMeals/Managment";
import Orders from './components/Orders/Orders';

export const APIUrl =
  "https://b273-2803-9800-a443-82a2-a047-8963-e6b0-2293.sa.ngrok.io";

function App() {
  const [cartVisibility, setCartVisibility] = useState(false);
  const [theme, setTheme] = useState("luxury");
  const dispatch = useDispatch();

  const showCartHandler = () => {
    setCartVisibility(true);
  };

  const hideCartHandler = () => {
    setCartVisibility(false);
  };

  const fetchMeals = useCallback(async () => {
    try {
      dispatch(mealsActions.loading());
      const response = await fetch(`${APIUrl}/api/v1/providers`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYyMzJhNzE5LThiOTUtNGY0NC04MGVmLTczNWFhYmIzNTg0YiIsInR5cGUiOlsicmVndWxhciJdLCJlbWFpbCI6ImFqYXRpYkBnbWFpbC5jb20iLCJpYXQiOjE2NTgyMzQ5MTQsImV4cCI6MTY2ODIzNDkxM30.m_FnPZ38puegcDynDErqS7ks0uZMZ0xx7nObjfxwi_w",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const info = [...data.data];

      const loadedMeals = [];
      const loadedOrders = [];

      for (const meal in info) {
        if (info[meal].name !== "prueba" && info[meal].name !== 'PEDIDO') {
          loadedMeals.push({
            id: info[meal].id,
            name: info[meal].name,
            description: info[meal].email,
            price: +info[meal].tax_id,
          });
        }
      }
      for (const order in info) {
        if (info[order].name === 'PEDIDO') {
          loadedOrders.push({
            data: info[order].json_data,
            id: info[order].id,
          });
        }
      }

      dispatch(mealsActions.loadMeals({ meals: loadedMeals }));
      dispatch(mealsActions.loadOrders({ orders: loadedOrders }))
      dispatch(mealsActions.loading());
    } catch (error) {
      dispatch(mealsActions.loadMeals({ meals: "Something went wrong" }));
      dispatch(mealsActions.loading());
    }
  }, [dispatch]);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  return (
    <Theme dataTheme={theme} className="text-[1rem] sm:text-[1.1rem]">
      <Modal
        className="bg-primary"
        open={cartVisibility}
        onClickBackdrop={hideCartHandler}
      >
        <Modal.Body>
          <Cart onCartVisibility={hideCartHandler} onRefresh={fetchMeals} />
        </Modal.Body>
      </Modal>
      <Header onCartVisibility={showCartHandler} onThemeChange={setTheme} />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <Meals />
        </Route>
        <Route path="/managment">
          <Managment onRefresh={fetchMeals} />
        </Route>
        <Route path='/orders'>
          <Orders onRefresh={fetchMeals} />
        </Route>
      </Switch>
    </Theme>
  );
}

export default App;
