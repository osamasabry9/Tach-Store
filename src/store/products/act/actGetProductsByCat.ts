import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "@utils";
import { TProduct } from "@types";

const actGetProductsByCat = createAsyncThunk(
  "products/actGetProductsByCat",
  async (prefix : string, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const { data } = await axios.get<TProduct[]>(
        `/products?cat_prefix=${prefix}` ,
        { signal }
      );
      return data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetProductsByCat;
