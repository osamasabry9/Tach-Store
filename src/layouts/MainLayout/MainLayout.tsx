import { Container } from "react-bootstrap";
import style from "./style.module.css";
import { Header, Footer } from "@components/common";

const { container, wrapper } = style;

const MainLayout = () => {
  return (
    <Container className={container}>
      <Header />
      <main className={wrapper}></main>
      <Footer />
    </Container>
  );
};

export default MainLayout;
