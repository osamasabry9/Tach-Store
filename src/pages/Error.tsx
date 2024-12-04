import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Container } from "react-bootstrap";

const Error = () => {
  const error = useRouteError();
  let errorMessage = "Something went wrong 😭";
  let statusCode = 404;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || errorMessage;
    statusCode = error.status || statusCode;
  }
  return (
    <Container className="notFound">
      <h1>
        Not Found 👀 <span className="text-danger">{statusCode}</span>
      </h1>
      <p>{errorMessage}</p>
      <Link to="/" replace={true}>
        Back to Home
      </Link>
    </Container>
  );
};

export default Error;
