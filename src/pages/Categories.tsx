import { Category } from "@components/eCommerce";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import { actGetCategories } from "@store/categories/categoriesSlice";
import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/common";
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
    <>
      <Heading>Categories</Heading>
      <Loading loading={loading} error={error}>
        <GridList<TCategory>
          records={ListOfCategories}
          renderItem={(record) => <Category {...record} />}
        />
      </Loading>
    </>
  );
};

export default Categories;
