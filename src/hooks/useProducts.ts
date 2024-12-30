import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  actGetProducts,
  cleanProductsRecords,
} from "@store/products/productSlice";
const useProducts = () => {
  const { prefix } = useParams();
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector((state) => state.products);
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItems = useAppSelector((state) => state.wishlist.itemsId);

  const productsFullInfo = records.map((product) => {
    return {
      ...product,
      quantity: cartItems[product.id] || 0,
      isLiked: wishlistItems.includes(product.id),
    };
  });
  useEffect(() => {
   const promise =   dispatch(actGetProducts(prefix as string));
    return () => {
      promise.abort();
      dispatch(cleanProductsRecords());
    };
  }, [dispatch]);

  const ListOfProducts = records.length > 0 ? productsFullInfo : [];
  return {loading, error, ListOfProducts, prefix};
}

export default useProducts
