import { Product } from "@components/eCommerce";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  actGetProducts,
  cleanProductsRecords,
} from "@store/products/productSlice";
import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/common";
import { TProduct } from "@customTypes/product";

const Products = () => {
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
    dispatch(actGetProducts(prefix as string));
    return () => {
      dispatch(cleanProductsRecords());
    };
  }, [dispatch]);

  const ListOfProducts = records.length > 0 ? productsFullInfo : [];
  return (
    <>
      <Heading title={`${prefix?.toUpperCase()} Products`} />
      <Loading loading={loading} error={error}>
        <GridList<TProduct>
          records={ListOfProducts}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  );
};

export default Products;
