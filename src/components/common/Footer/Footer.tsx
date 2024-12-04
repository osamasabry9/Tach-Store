import styles from "./styles.module.css";
const { footerContainer } = styles;

const dateNow = new Date().getFullYear();
const Footer = () => {
  return (
    <footer className={footerContainer}>
      &copy; {dateNow} Tach Store. All rights reserved.
    </footer>
  );
};

export default Footer;
