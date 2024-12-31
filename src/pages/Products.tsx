import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/common";
import { TProduct } from "@types";
import useProducts from "@hooks/useProducts";

const Products = () => {
  const { ListOfProducts, loading, error, prefix } = useProducts();

  return (
    <>
      <Heading title={`${prefix?.toUpperCase()} Products`} />
      <Loading status={loading} error={error} type="product">
        <GridList<TProduct>
          emptyMessage="No products found"
          records={ListOfProducts}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  );
};

export default Products;
