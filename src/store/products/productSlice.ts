import { createSlice } from "@reduxjs/toolkit";
import actGetProductsByCat from "./act/actGetProductsByCat";
import { TProduct } from "@customTypes/product";
import { TLoading } from "@customTypes/shared";

interface IProductsState {
  records: TProduct[];
  loading: TLoading;
  error: string | null;
}

const initialState: IProductsState = {
  records: [],
  loading: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    cleanProductsRecords: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductsByCat.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(actGetProductsByCat.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(actGetProductsByCat.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export const { cleanProductsRecords } = productSlice.actions;
export default productSlice.reducer;
export { actGetProductsByCat as actGetProducts };
