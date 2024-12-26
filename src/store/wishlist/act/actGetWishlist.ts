import { TProduct } from "@customTypes/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TResponse = TProduct[]


const actGetWishlist = createAsyncThunk(
  "wishlist/actGetWishlist",
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI;
    try {
      const userWishlist = await axios.get<{productId: number}[]>("/wishlist?userId=1");
      if(!userWishlist.data.length) return fulfillWithValue([]);
      const concatenatedProductId = userWishlist.data.map((id) => `id=${id.productId}`).join("&");
      const { data } = await axios.get<TResponse>(
        `/products?${concatenatedProductId}`
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

export default actGetWishlist;
