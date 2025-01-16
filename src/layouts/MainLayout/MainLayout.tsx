import { Container } from "react-bootstrap";
import style from "./style.module.css";
import { Header, Footer } from "@components/common";
import { Outlet } from "react-router-dom";
import { ToastList } from "@components/feedback";

const { container, wrapper } = style;

const MainLayout = () => {
  return (
    <Container className={container}>
      <Header />
      <main className={wrapper}>
        <Outlet/>
      </main>
      <Footer />
      <ToastList/>
    </Container>
  );
};

export default MainLayout;
