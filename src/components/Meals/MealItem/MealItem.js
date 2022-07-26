import { useDispatch } from "react-redux";

import { cartActions } from "../../../Store/cartSlice";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
  const dispatch = useDispatch();

  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    dispatch(
      cartActions.addItem({
        id: props.id,
        name: props.name,
        amount: amount,
        price: props.price,
      })
    );
  };

  return (
    <li className="flex justify-between flex-col sm:flex-row m-4 pb-4 border-b-[#ccc] border-b-[1px] text-secondary">
      <div>
        <h3 className="m-0 sm:mb-1 text-[1.2rem] sm:text-[1.5rem]">{props.name}</h3>
        <div className="italic">{props.description}</div>
        <div className="sm:mt-1 font-bold text-[1.25rem]">
          {price}
        </div>
      </div>
      <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
    </li>
  );
};

export default MealItem;
