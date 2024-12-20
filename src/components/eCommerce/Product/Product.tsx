import { useState, useEffect, memo } from "react";
import { Button, Spinner } from "react-bootstrap";
import { TProduct } from "@customTypes/product";
import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/cart/cartSlice";

import styles from "./styles.module.css";

const { product, productImg, maximumNotice } = styles;

const Product = memo(({ id, title, price, img, max, quantity }: TProduct) => {
  const dispatch = useAppDispatch();
  const [isDisabled, setIsDisabled] = useState(false);

  const currentRemainingQuantity = max - (quantity ?? 0);
  const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false;

  useEffect(() => {
    if (!isDisabled) return;
    const debounce = setTimeout(() => {
      setIsDisabled(false);
    }, 300);
    return () => clearTimeout(debounce);
  }, [isDisabled]);

  const handleAddToCart = () => {
    dispatch(addToCart(id));
    setIsDisabled(true);
  };

  return (
    <div className={product}>
      <div className={productImg}>
        <img src={img} alt={title} />
      </div>
      <h2>{title}</h2>
      <h3>{price.toFixed(2)} EGP</h3>
      <p className={maximumNotice}>Remaining: {currentRemainingQuantity}</p>
      {quantityReachedToMax && (
        <p className={maximumNotice}>Quantity reached to max</p>
      )}
      <Button
        variant="info"
        style={{ color: "white" }}
        onClick={handleAddToCart}
        disabled={isDisabled || quantityReachedToMax}
      >
        {isDisabled ? (
          <>
            <Spinner animation="border" size="sm" /> Loading
          </>
        ) : (
          "Add to cart"
        )}
      </Button>
    </div>
  );
});

export default Product;
