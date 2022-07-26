import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import mealsSlice from "./mealsSlice";

const store = configureStore({
    reducer: {
        meals: mealsSlice.reducer,
        cart: cartSlice.reducer,
    }
});

export default store;