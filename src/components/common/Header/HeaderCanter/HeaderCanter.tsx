import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.css";

type HeaderCounterProps = {
  title: string;
  totalQuantity: number;
  svgIcon: React.ReactNode;
  pageNavigate: string;
};

const { container, totalNum, pumpAnimate, iconWrapper } = styles;

const HeaderCounter = ({
  title,
  totalQuantity,
  svgIcon,
  pageNavigate,
}: HeaderCounterProps) => {
  const navigate = useNavigate();
  const [isAnimate, setIsAnimate] = useState(false);
  const quantityStyle = `${totalNum} ${isAnimate ? pumpAnimate : ""}`;

  useEffect(() => {
    if (!totalQuantity) return;
    setIsAnimate(true);
    const debounce = setTimeout(() => {
      setIsAnimate(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [totalQuantity]);

  return (
    <div className={container} onClick={() => navigate(pageNavigate)}>
      <div className={iconWrapper}>
        {svgIcon}
        {totalQuantity > 0 && (
          <div className={quantityStyle}>{totalQuantity}</div>
        )}
      </div>
      <h3>{title}</h3>
    </div>
  );
};

export default HeaderCounter;
