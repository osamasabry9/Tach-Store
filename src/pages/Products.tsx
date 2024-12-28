import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/common";
import { TProduct } from "@customTypes/product";
import useProducts from "@hooks/useProducts";

const Products = () => {
  const { ListOfProducts, loading, error, prefix } = useProducts();

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
