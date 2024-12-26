import { GridList, Heading } from "@components/common";
import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { TProduct } from "@customTypes/product";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetWishlist,
  productsFullInfoCleanUp,
} from "@store/wishlist/wishlistSlice";
import { useEffect } from "react";

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const { productsFullInfo, loading, error } = useAppSelector(
    (state) => state.wishlist
  );

  const cartItems = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(actGetWishlist());
    return () => {
      dispatch(productsFullInfoCleanUp());
    };
  }, [dispatch]);

  const ListOfProducts = productsFullInfo.map((product) => {
    return {
      ...product,
      quantity: cartItems[product.id] || 0,
      isLiked: true,
    };
  });

  return (
    <>
      <Heading>Your Wishlist</Heading>
      {ListOfProducts.length > 0 ? (
        <Loading loading={loading} error={error}>
          <GridList<TProduct>
            records={ListOfProducts}
            renderItem={(record) => <Product {...record} />}
          />
        </Loading>
      ) : (
        <p className="text-center ">No products in wishlist</p>
      )}
    </>
  );
};

export default Wishlist;
