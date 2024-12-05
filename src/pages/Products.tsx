import { Container } from "react-bootstrap";
import { Product } from "@components/eCommerce";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { actGetProducts, productsCleanUp } from "@store/products/productSlice";
import { Loading } from "@components/feedback";
import { GridList } from "@components/common";
import { TProduct } from "@customTypes/product";

const Products = () => {
  const { prefix } = useParams();
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector((state) => state.products);
  useEffect(() => {
    dispatch(actGetProducts(prefix as string));
    return () => {
      dispatch(productsCleanUp());
    };
  }, [dispatch]);

  const ListOfProducts = records.length > 0 ? records : [];

  return (
    <Container>
      <Loading loading={loading} error={error}>
        <GridList<TProduct>
          records={ListOfProducts}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Products;
