import { Category } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/common";
import { TCategory } from "@customTypes/category";
import useCategories from "@hooks/useCategories";

const Categories = () => {
  const { ListOfCategories, loading, error } = useCategories();

  return (
    <>
      <Heading title={"Categories"} />
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
