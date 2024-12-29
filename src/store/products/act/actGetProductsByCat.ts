import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "@util";
import { TProduct } from "@customTypes/product";

const actGetProductsByCat = createAsyncThunk(
  "products/actGetProductsByCat",
  async (prefix : string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.get<TProduct[]>(
        `/products?cat_prefix=${prefix}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetProductsByCat;
