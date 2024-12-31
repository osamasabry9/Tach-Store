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
      <Loading status={loading} error={error} type="product">
        <GridList<TProduct>
          emptyMessage="Your wishlist is empty, please like some products to add"
          records={ListOfProducts}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  );
};

export default Wishlist;
