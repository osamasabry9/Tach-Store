import { useState, useEffect, memo } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { TProduct } from "@types";
import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/cart/cartSlice";
import Like from "@assets/Icons/like.svg?react";
import LikeFill from "@assets/Icons/like-fill.svg?react";
import { actLikeToggle } from "@store/wishlist/wishlistSlice";

import styles from "./styles.module.css";
import ProductInfo from "../ProductInfo/ProductInfo";

const { maximumNotice, wishlistBtn } = styles;

const Product = memo(
  ({
    id,
    title,
    price,
    img,
    max,
    quantity,
    isLiked,
    isAuthenticated,
  }: TProduct) => {
    const dispatch = useAppDispatch();

    const [showModal, setShowModal] = useState(false);

    const [isDisabled, setIsDisabled] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

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

    const likeToggleHandler = () => {
      if (isAuthenticated) {
        if (!isLoading) {
          setIsLoading(true);
          dispatch(actLikeToggle(id))
            .unwrap()
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false));
        }
      } else {
        setShowModal(true);
      }
    };

    return (
      <>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Login Required</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You need to login first to add this item to your wishlist.
          </Modal.Body>
        </Modal>

        <ProductInfo title={title} price={price} img={img} >
          <div className={wishlistBtn} onClick={likeToggleHandler}>
            {isLoading ? (
              <Spinner animation="border" size="sm" variant="primary" />
            ) : isLiked ? (
              <LikeFill />
            ) : (
              <Like />
            )}
          </div>
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
        </ProductInfo>
      </>
    );
  }
);

export default Product;
