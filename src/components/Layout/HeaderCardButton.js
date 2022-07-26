import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import MediaQuery from "react-responsive";
import { Button } from "react-daisyui";

const HeaderCardButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const items = useSelector((state) => state.cart.items);

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const bump = `animate-bump`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <Button
      color="secondary"
      className={`${btnIsHighlighted ? bump : ""}`}
      onClick={props.onCartVisibility}
    >
      <span className="mr-1">
        <FontAwesomeIcon icon={faCartShopping} />
      </span>
      <MediaQuery minWidth={640}>
        <span className="mx-1 text-[1.1rem] capitalize">Your Cart</span>
      </MediaQuery>
      <span className="bg-primary rounded-full p-2 ml-1">
        {numberOfCartItems}
      </span>
    </Button>
  );
};

export default HeaderCardButton;
