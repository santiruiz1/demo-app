import { createSlice } from "@reduxjs/toolkit";

const initialState = { meals: [],orders: [], isLoading: false };

const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    loadMeals(state, action) {
      state.meals = [...action.payload.meals];
    },
    loading(state) {
      state.isLoading = !state.isLoading;
    },
    loadOrders(state, action) {
      state.orders = [...action.payload.orders]
    }
  },
});

export const mealsActions = mealsSlice.actions;

export default mealsSlice;
