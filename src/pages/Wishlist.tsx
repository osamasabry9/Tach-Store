import { GridList, Heading } from "@components/common";
import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { TProduct } from "@types";
import useWishlist from "@hooks/useWishlist";

const Wishlist = () => {
  const { ListOfProducts, loading, error } = useWishlist();

  return (
    <>
      <Heading title="Your Wishlist" />
      {ListOfProducts.length > 0 ? (
        <Loading loading={loading} error={error}>
          <GridList<TProduct>
            records={ListOfProducts}
            renderItem={(record) => <Product {...record} />}
          />
        </Loading>
      ) : (
        <p className="text-center ">No products in wishlist</p>
      )}
    </>
  );
};

export default Wishlist;
