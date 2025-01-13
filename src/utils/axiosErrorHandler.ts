import { isAxiosError } from "axios";

export const axiosErrorHandler = (error: unknown) => {
  if (isAxiosError(error)) {
    return (
      error.response?.data || error.response?.data.message || error.message
    );
  }
  return "Something went wrong in getting products 😭";
};
