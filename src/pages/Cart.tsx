import { Heading } from "@components/common";
import { CartItemList, CartSubtotalPrice } from "@components/eCommerce";
import { Loading, LottieHandler } from "@components/feedback";
import useCart from "@hooks/useCart";

const CartPage = () => {
  const { products, loading, error, changeQuantityHandler, removeItemHandler } =
    useCart();

  return (
    <>
      <Heading title="Your Cart" />
      <Loading status={loading} error={error} type="cart">
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
          <LottieHandler type="empty" message="Your cart is empty" />
        )}
      </Loading>
    </>
  );
};

export default CartPage;
