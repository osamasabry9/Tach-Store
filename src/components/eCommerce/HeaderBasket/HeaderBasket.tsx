import Logo from "@assets/Icons/iconBasket.svg?react";
import styles from "./styles.module.css";

const { basketContainer, basketQuantity, basketIcon } = styles;

const HeaderBasket = () => {
  return (
    <div className={basketContainer}>
      <Logo title="basket icon" className={basketIcon} />
      <div className={basketQuantity}>0</div>
    </div>
  );
};

export default HeaderBasket;
