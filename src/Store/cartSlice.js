import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.totalAmount =
        state.totalAmount + action.payload.price * action.payload.amount;

      const items = current(state.items);

      const existingCartItemIndex = items.findIndex(
        (item) => item.id === action.payload.id
      );
      const existingCartItem = state.items[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.payload.amount,
        };
        state.items[existingCartItemIndex] = updatedItem;
      } else {
        state.items = state.items.concat(action.payload);
      }
    },
    removeItem(state, action) {
      const items = current(state.items);

      const existingCartItemIndex = items.findIndex(
        (item) => item.id === action.payload.id
      );
      const existingItem = state.items[existingCartItemIndex];

      state.totalAmount = state.totalAmount - existingItem.price;

      if (existingItem.amount === 1) {
        state.items = items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        state.items[existingCartItemIndex] = updatedItem;
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
