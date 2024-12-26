import { useState, useEffect } from "react";
import Logo from "@assets/Icons/wishlist.svg?react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@store/hooks";


import styles from "./styles.module.css";
const { container, totalNum, pumpAnimate, iconWrapper } = styles;

const HeaderWishlist = () => {
  const navigate = useNavigate();
  const [isAnimate, setIsAnimate] = useState(false);
  const totalQuantity = useAppSelector((state) => state.wishlist.itemsId.length);
  const quantityStyle = `${totalNum} ${
    isAnimate ? pumpAnimate : ""
  }`;

  useEffect(() => {
    if (!totalQuantity) return;
    setIsAnimate(true);
    const debounce = setTimeout(() => {
      setIsAnimate(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [totalQuantity]);

  return (
    <div className={container} onClick={() => navigate("/wishlist")}>
       <div className={iconWrapper}>
        <Logo title="Wishlist icon" />
        {totalQuantity > 0 && (
          <div className={quantityStyle}>{totalQuantity}</div>
        )}
      </div>
      <h3>Wishlist</h3>
    </div>
  );
};

export default HeaderWishlist;
