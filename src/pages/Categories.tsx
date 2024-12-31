import { Category } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/common";
import { TCategory } from "@types";
import useCategories from "@hooks/useCategories";

const Categories = () => {
  const { ListOfCategories, loading, error } = useCategories();

  return (
    <>
      <Heading title={"Categories"} />
      <Loading status={loading} error={error} type="category">
        <GridList<TCategory>
          emptyMessage="No categories found"
          records={ListOfCategories}
          renderItem={(record) => <Category {...record} />}
        />
      </Loading>
    </>
  );
};

export default Categories;
