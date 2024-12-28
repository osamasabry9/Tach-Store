import { Heading } from "@components/common";
import { CartItemList, CartSubtotalPrice } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import useCart from "@hooks/useCart";

const CartPage = () => {
  const { products, loading, error, changeQuantityHandler, removeItemHandler } =
    useCart();

  return (
    <>
      <Heading title="Your Cart" />
      <Loading loading={loading} error={error}>
        {products.length ? (
          <>
            <CartItemList
              products={products}
              changeQuantityHandler={changeQuantityHandler}
              removeItemHandler={removeItemHandler}
            />
            <CartSubtotalPrice products={products} />
          </>
        ) : (
          "No items in cart"
        )}
      </Loading>
    </>
  );
};

export default CartPage;
