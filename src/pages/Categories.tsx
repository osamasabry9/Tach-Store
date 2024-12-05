import { Container, Row, Col } from "react-bootstrap";
import { Category } from "@components/eCommerce";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import { actGetCategories } from "@store/categories/categoriesSlice";

const Categories = () => {
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector(
    (state) => state.categories
  );
  useEffect(() => {
    if (!records.length) {
      dispatch(actGetCategories());
    }
  }, [dispatch, records]);

  if (loading === "pending") {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }
  const ListOfCategories = records.length > 0 ? records : [];
  return (
    <Container>
      <Row>
        {ListOfCategories.map((category) => (
          <Col
            key={category.id}
            xs={6}
            md={3}
            className="
            d-flex
            justify-content-center
            mb-5 mt-2
          "
          >
            <Category {...category} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Categories;
