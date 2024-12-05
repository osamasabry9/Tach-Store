import { Container, Row, Col } from "react-bootstrap";
import { Product } from "@components/eCommerce";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { actGetProducts, productsCleanUp } from "@store/products/productSlice";

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
  if (loading === "pending") {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }
  const ListOfProducts = records.length > 0 ? records : [];

  return (
    <Container>
      <Row>
        {ListOfProducts.map((product) => (
          <Col
            key={product.id}
            xs={6}
            md={3}
            className="d-flex justify-content-center mb-4 mt-2 "
          >
            <Product {...product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;
