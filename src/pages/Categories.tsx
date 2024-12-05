import { Container } from "react-bootstrap";
import { Category } from "@components/eCommerce";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import { actGetCategories } from "@store/categories/categoriesSlice";
import { Loading } from "@components/feedback";
import { GridList } from "@components/common";
import { TCategory } from "@customTypes/category";

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

  const ListOfCategories = records.length > 0 ? records : [];
  return (
    <Container>
      <Loading loading={loading} error={error}>
        <GridList<TCategory>
          records={ListOfCategories}
          renderItem={(record) => <Category {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Categories;
