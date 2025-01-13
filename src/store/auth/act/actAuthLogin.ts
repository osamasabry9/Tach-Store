import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "@utils";

type IFormData = {
  email: string;
  password: string;
};

type TResponse = {
  accessToken: string;
  user: {
    email: string;
    id: number;
    firstName: string;
    lastName: string;
  };
};

const actAuthLogin = createAsyncThunk(
  "auth/actAuthLogin",
  async (formData: IFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.post<TResponse>("/login", formData);
      return data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actAuthLogin;
