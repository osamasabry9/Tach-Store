import { Heading } from "@components/common";
import { CartItemList, CartSubtotalPrice } from "@components/eCommerce";
import { Loading, LottieHandler } from "@components/feedback";
import useCart from "@hooks/useCart";

const CartPage = () => {
  const { products, loading, error, changeQuantityHandler, removeItemHandler, userAccessToken, placeOrderStatus } =
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
            <CartSubtotalPrice products={products}
              userAccessToken={userAccessToken}/>
          </>
        ) : placeOrderStatus === "succeeded" ? (
          <LottieHandler
            message="Your order has been placed successfully"
            type="success"
          />
        ) : (
          <LottieHandler message="Your cart is empty" type="empty" />
        )}
      </Loading>
    </>
  );
};

export default CartPage;
