import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetWishlist,
  cleanWishlistProductsFullInfo,
} from "@store/wishlist/wishlistSlice";
import { useEffect } from "react";
const useWishlist = () => {
  const dispatch = useAppDispatch();
  const { productsFullInfo, loading, error } = useAppSelector(
    (state) => state.wishlist
  );

  const cartItems = useAppSelector((state) => state.cart.items);

  useEffect(() => {
   const promise = dispatch(actGetWishlist());
    return () => {
      promise.abort();
      dispatch(cleanWishlistProductsFullInfo());
    };
  }, [dispatch]);

  const ListOfProducts = productsFullInfo.map((product) => {
    return {
      ...product,
      quantity: cartItems[product.id] || 0,
      isLiked: true,
    };
  });
  return {
    loading,
    error,
    ListOfProducts,
  };
};

export default useWishlist;
