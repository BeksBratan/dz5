import { configureStore } from '@reduxjs/toolkit';
import menuSlice from "../features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    menu: menuSlice,
  },
});
