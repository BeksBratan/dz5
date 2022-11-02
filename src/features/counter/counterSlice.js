import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
  menu: {
    food: null,
  },
  order: {}
};

export const getMenu = createAsyncThunk(
  'menu',
  async (_, {dispatch}) => {
    const response = await axios.get("https://lesson-4fd7f-default-rtdb.firebaseio.com/menu"+".json");
    await dispatch(setMenu(response.data));
  }
);
export const addOrder = createAsyncThunk(
  'order',
  async (order, {dispatch}) => {
    await axios.post("https://lesson-4fd7f-default-rtdb.firebaseio.com/order"+".json", order);
  }
);

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenu(state, action) {
      state.menu.food = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(incrementAsync.pending, (state) => {
  //       state.status = 'loading';
  //     })
  //     .addCase(incrementAsync.fulfilled, (state, action) => {
  //       state.status = 'idle';
  //       state.value += action.payload;
  //     });
  // },
});

export const { setMenu } = menuSlice.actions;
export default menuSlice.reducer;
