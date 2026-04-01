import "./ComponentHeader.css";
import { Link } from "react-router-dom";

const ComponentHeader = (props) => {
  return (
    <div className="ComponentHeader text-light">
      <div>
        <h1 className="text-center">{props.heading}</h1>
        <h5 className="text-center"><Link to="/" className="text-decoration-none text-light">Home</Link> / {props.component}</h5>
      </div>
    </div>
  );
};

export default ComponentHeader;