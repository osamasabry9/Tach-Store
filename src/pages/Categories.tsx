import { Container, Row, Col } from "react-bootstrap";
import { Category } from "@components/eCommerce";

const ListOfCategoriesDummy = [
  {
    title: "Laptops",
    img: "https://eg.hm.com/assets/styles/HNM/14482498/6103a8463876770c30cdba3535b7be1f333315fe/2/image-thumb__3464789__product_listing/cb91f8f128ac2125e0ec3a008a2e8d2497d15434.jpg",
    prefix: "laptops",
  },
  {
    title: "Phones",
    img: "https://eg.hm.com/assets/styles/HNM/13650519/6cc34f51caee1d6cfe776b933d667075fa30d90d/2/image-thumb__2888777__product_listing/16c27492b022ac2eef03853f85d5b279a29ebeed.jpg",
    prefix: "phones",
  },
  {
    title: "Tablets",
    img: "https://eg.hm.com/assets/styles/HNM/13994073/eeb1d90c4764366000eb8b8571396e81f0de5c44/2/image-thumb__3142108__product_listing/4d6db9e8f936d3d82b13bc5861b0310fa214c74d.jpg",
    prefix: "tablets",
  },
  {
    title: "Accessories",
    img: "https://eg.hm.com/assets/styles/HNM/14482498/6103a8463876770c30cdba3535b7be1f333315fe/2/image-thumb__3464789__product_listing/cb91f8f128ac2125e0ec3a008a2e8d2497d15434.jpg",
    prefix: "accessories",
  },
  {
    title: "Laptops",
    img: "https://eg.hm.com/assets/styles/HNM/14482498/6103a8463876770c30cdba3535b7be1f333315fe/2/image-thumb__3464789__product_listing/cb91f8f128ac2125e0ec3a008a2e8d2497d15434.jpg",
    prefix: "laptops",
  },
];

const Categories = () => {
  return (
    <Container>
      <Row>
        {ListOfCategoriesDummy.map((category) => (
          <Col
            key={category.title}
            xs={6}
            md={3}
            className="
            d-flex
            justify-content-center
            mb-5 mt-2
          "
          >
            <Category {...category} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Categories;
