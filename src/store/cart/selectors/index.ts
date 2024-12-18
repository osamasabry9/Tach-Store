import { useAppSelector } from "@store/hooks";

const cartItems = useAppSelector((state) => state.cart.items);

  const getCartTotalQuantitySelector = Object.values(cartItems).reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );


export { getCartTotalQuantitySelector };
