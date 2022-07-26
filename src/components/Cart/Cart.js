import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import { cartActions } from "../../Store/cartSlice";
import { Button } from "react-daisyui";

import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { APIUrl } from "../../App";

const Cart = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [order, setOrder] = useState(false);
  const [finalMessage, setFinalMessage] = useState(
    <p className="mb-2 text-success font-semibold">
      Successfully sent the order!
    </p>
  );

  const dispatch = useDispatch();

  const items = useSelector((state) => state.cart.items);
  const reduxTotalAmount = useSelector((state) => state.cart.totalAmount);

  const totalAmount = `$${reduxTotalAmount.toFixed(2)}`;
  const hasItems = items.length > 0;

  useEffect(() => {
    if (items.length === 0) {
      setOrder(false);
    }
  }, [items]);

  const cancelOrder = () => {
    setOrder(false);
  };

  const orderHandler = () => {
    setOrder(true);
  };

  const makeOrderHandler = (personalInfo) => {
    setIsSubmitting(true);
    const pedido = JSON.stringify({ user: personalInfo, orderedItems: items });

    const postData = async () => {
      const response = await fetch(
        `${APIUrl}/api/v1/providers?name=PEDIDO&email=PEDIDO&tax_id=1&json_data=${pedido}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application.json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYyMzJhNzE5LThiOTUtNGY0NC04MGVmLTczNWFhYmIzNTg0YiIsInR5cGUiOlsicmVndWxhciJdLCJlbWFpbCI6ImFqYXRpYkBnbWFpbC5jb20iLCJpYXQiOjE2NTgyMzQ5MTQsImV4cCI6MTY2ODIzNDkxM30.m_FnPZ38puegcDynDErqS7ks0uZMZ0xx7nObjfxwi_w",
          },
        }
      );
      if (!response.ok) {
        throw new Error();
      }
      setIsSubmitting(false);
      dispatch(cartActions.clearCart());
      setDidSubmit(true);
      props.onRefresh();
      setTimeout(() => {
        setDidSubmit(false);
      }, 3000);
    };
    postData().catch((error) => {
      setIsSubmitting(false);
      setFinalMessage(
        <p className="mb-2 text-error font-semibold">
          Something went wrong! Please try again later.
        </p>
      );
      setDidSubmit(true);
      setTimeout(() => {
        setDidSubmit(false);
      }, 2500);
    });
  };

  const cartItemRemoveHandler = (id) => {
    dispatch(cartActions.removeItem({ id: id }));
  };

  const cartItemAddHandler = (item) => {
    dispatch(cartActions.addItem({ ...item, amount: 1 }));
  };

  const cartItems = (
    <ul className="list-none m-0 p-0">
      {items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className="text-right">
      <Button onClick={props.onCartVisibility}>Close</Button>
      {hasItems && (
        <Button className="ml-2" onClick={orderHandler}>
          Order
        </Button>
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className="flex justify-between items-center font-bold text-[1.5rem] my-4 mx-0">
        <span>Total Amount</span>
        <span className="text-success">{totalAmount}</span>
      </div>
      {order && hasItems && (
        <Checkout
          onClose={props.onCartVisibility}
          onCancel={cancelOrder}
          onOrder={makeOrderHandler}
        />
      )}
      {!order && modalActions}
    </Fragment>
  );

  const isSubmitingModalContent = <p className="mb-2">Sending order data...</p>;
  const didSubmitModalContent = <Fragment>{finalMessage}</Fragment>;

  return (
    <>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmitingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </>
  );
};

export default Cart;
