import { useState, useEffect, memo, useCallback } from "react";
import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/cart/cartSlice";
import { addToast } from "@store/toasts/toastsSlice";
import { actLikeToggle } from "@store/wishlist/wishlistSlice";
import Like from "@assets/Icons/like.svg?react";
import LikeFill from "@assets/Icons/like-fill.svg?react";
import ProductInfo from "../ProductInfo/ProductInfo";
import { Button, Modal, Spinner } from "react-bootstrap";
import { TProduct } from "@types";
import styles from "./styles.module.css";

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
    const quantityReachedToMax = currentRemainingQuantity <= 0;

    // Debounce effect for disabling the button
    useEffect(() => {
      if (!isDisabled) return;

      const debounce = setTimeout(() => {
        setIsDisabled(false);
      }, 300);

      return () => clearTimeout(debounce);
    }, [isDisabled]);

    // Handle adding product to cart
    const handleAddToCart = useCallback(() => {
      dispatch(addToCart(id));

      dispatch(
        addToast({
          title: "Add to Cart",
          type: "success",
          message: `${title} added to cart`,
          onCloseToast: () => console.log("Toast closed"),
        })
      );

      // Show warning toast if quantity reaches maximum
      if (currentRemainingQuantity - 1 === 0) {
        dispatch(
          addToast({
            type: "warning",
            message: `You reached the maximum quantity for ${title}`,
            delayAnimation: true,
          })
        );
      }

      setIsDisabled(true);
    }, [dispatch, id, title, currentRemainingQuantity]);

    // Handle like/unlike toggle
    const likeToggleHandler = useCallback(async () => {
      if (!isAuthenticated) {
        setShowModal(true);
        return;
      }

      if (isLoading) return;

      setIsLoading(true);

      try {
        await dispatch(actLikeToggle(id)).unwrap();

        if (!isLiked) {
          dispatch(
            addToast({
              type: "success",
              message: `${title} added to wishlist`,
            })
          );
        }
      } catch (error) {
        dispatch(
          addToast({
            title: "Failed Operation",
            type: "danger",
            message: "Failed to add to wishlist, error from server",
          })
        );
      } finally {
        setIsLoading(false);
      }
    }, [dispatch, id, title, isLiked, isAuthenticated, isLoading]);

    return (
      <>
        {/* Login Required Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Login Required</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You need to login first to add this item to your wishlist.
          </Modal.Body>
        </Modal>

        {/* Product Information */}
        <ProductInfo title={title} price={price} img={img}>
          {/* Wishlist Button */}
          <div className={wishlistBtn} onClick={likeToggleHandler}>
            {isLoading ? (
              <Spinner animation="border" size="sm" variant="primary" />
            ) : isLiked ? (
              <LikeFill />
            ) : (
              <Like />
            )}
          </div>

          {/* Remaining Quantity Notice */}
          <p className={maximumNotice}>Remaining: {currentRemainingQuantity}</p>

          {/* Maximum Quantity Reached Notice */}
          {quantityReachedToMax && (
            <p className={maximumNotice}>Quantity reached to max</p>
          )}

          {/* Add to Cart Button */}
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
