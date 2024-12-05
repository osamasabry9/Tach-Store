import { Row, Col } from "react-bootstrap";

type TGridListProps<T> = {
  records: T[];
  renderItem: (record: T) =>  React.ReactNode;
}
const GridList = <T extends { id: number }>({ records, renderItem }: TGridListProps<T>) => {

  const renderItems = records.map((record) => (
    <Col
      key={record.id}
      xs={6}
      md={3}
      className="
        d-flex
        justify-content-center
        mb-5 mt-2
      "
    >
      {renderItem(record)}
    </Col>
  ));

  return (
    <Row>{renderItems}</Row>
  )
}

export default GridList
