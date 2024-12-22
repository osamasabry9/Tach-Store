import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axios from "axios";

import { TProduct } from "@customTypes/product";
type TResponse = TProduct[];

const actGetProductsByItems = createAsyncThunk(
  "cart/actGetProductsByItems",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState, fulfillWithValue } = thunkAPI;
    const { cart } = getState() as RootState;
    const itemsId = Object.keys(cart.items);
    if(!itemsId.length) return fulfillWithValue([]);
    try {
      const concatenatedItemId = itemsId.map((id) => `id=${id}`).join("&");
      const { data } = await axios.get<TResponse>(
        `/products?${concatenatedItemId}`
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      }
      return rejectWithValue("Something went wrong in getting products 😭");
    }
  }
);

export default actGetProductsByItems;
