import WishlistIcon from "@assets/Icons/wishlist.svg?react";
import CartIcon from "@assets/Icons/iconBasket.svg?react";
import { useAppSelector } from "@store/hooks";

import styles from "./styles.module.css";
import { getCartTotalQuantitySelector } from "@store/cart/cartSlice";
import HeaderCounter from "../HeaderCanter/HeaderCanter";
const { headerLeftBar } = styles;

const HeaderWishlist = () => {
  const wishlistTotalQuantity = useAppSelector(
    (state) => state.wishlist.itemsId.length
  );
  const cartTotalQuantity = useAppSelector(getCartTotalQuantitySelector);

  return (
    <div className={headerLeftBar}>
      <HeaderCounter
        title="wishlist"
        svgIcon=<WishlistIcon />
        totalQuantity={wishlistTotalQuantity}
        pageNavigate="/wishlist"
      />
      <HeaderCounter
        title="cart"
        svgIcon=<CartIcon />
        totalQuantity={cartTotalQuantity}
        pageNavigate="/cart"
      />
    </div>
  );
};

export default HeaderWishlist;
