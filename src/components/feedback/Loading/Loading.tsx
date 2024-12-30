import { TLoading } from "@types";
import Styles from "./styles.module.css";

const { load, spinner } = Styles;

type LoadingProps = {
  loading: TLoading;
  error: string | null;
  children: React.ReactNode;
};
const Loading = ({ loading, error, children }: LoadingProps) => {
  if (loading === "pending") {
    return (
      <div className={load}>
        <div className={spinner}></div>
        <p>Loading...</p>
      </div>
    );
  }
  if (loading === "failed") {
    return <div>{error}</div>;
  }
  return <div>{children}</div>;
};

export default Loading;
