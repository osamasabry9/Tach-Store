import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import {
  actGetCategories,
  cleanCategoriesRecords,
} from "@store/categories/categoriesSlice";

const useCategories = () => {
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector(
    (state) => state.categories
  );
  useEffect(() => {
    if (!records.length) {
      dispatch(actGetCategories());
    }

    return () => {
      dispatch(cleanCategoriesRecords());
    };
  }, [dispatch]);

  const ListOfCategories = records.length > 0 ? records : [];
  return {loading, error, ListOfCategories};
}

export default useCategories
