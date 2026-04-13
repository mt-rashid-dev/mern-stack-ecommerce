import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Button from "react-bootstrap/Button";

const ToastBox = (props) => {
  const headingStyle = {
    backgroundColor: props.success? "darkgreen" : "darkred",
    color: "white",
  }

  const messageStyle = {
    backgroundColor: props.success? "green" : "red",
    color: "white",
  }

  return (
    <ToastContainer
      className="p-3"
      position="top-end"
      style={{ zIndex: 1 }}
    >
      <Toast className="">
        <div
          className="d-flex justify-content-between align-items-center"
          style={ headingStyle }
        >
          <h5 className="m-0 ps-3">{props.heading}</h5>
          <Button
            variant="danger"
            className="rounded-0"
            onClick={() => props.setShowToast(false)}
          >
            <i className="bi bi-x-lg"></i>
          </Button>
        </div>
        <p className="m-0 p-3" style={ messageStyle }>{props.message}</p>
      </Toast>
    </ToastContainer>
  );
};

export default ToastBox;