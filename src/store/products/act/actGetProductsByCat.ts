import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TProduct } from "@customTypes/product";

const actGetProductsByCat = createAsyncThunk(
  "products/actGetProductsByCat",
  async (prefix : string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.get<TProduct[]>(
        `http://localhost:7000/products?cat_prefix=${prefix}`
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

export default actGetProductsByCat;
