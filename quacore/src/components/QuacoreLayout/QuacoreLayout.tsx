import NavBar from "../NavBar/NavBar";
import "./quacore-layout.scss";

type QuacoreLayoutProps = {
  children: JSX.Element;
  className?: string;
};

const QuacoreLayout = ({ children, className = "" }: QuacoreLayoutProps) => {
  return (
    <div className={"quacore-layout"}>
      <NavBar />
      <div className="quacore-layout-body">
        <div className={className}>{children}</div>
      </div>
    </div>
  );
};

export default QuacoreLayout;
