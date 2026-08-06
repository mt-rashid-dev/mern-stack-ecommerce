import "./PendingOrders.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const PendingOrders = () => {
  const theme = useSelector((state) => state.themeReducer.theme);
  const [pendingOrders, setPendingOrders] = useState(null);
  const [showMessage, setShowMessage] = useState("");
  const [singleOrder, setSingleOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    toggleStyle();
    fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/orders/pending-orders`);
  }, [theme]);

  const toggleStyle = () => {
    const heading = document.getElementById("pendingOrdersHeading");

    if (theme === "dark") {
      heading.classList.remove("border-dark");
      heading.classList.add("border-light");
    }

    if (theme === "light") {
      heading.classList.remove("border-light");
      heading.classList.add("border-dark");
    }
  };

  const fetchData = (url) => {
    axios.get(url, { withCredentials: true })
      .then((res) => {
        setPendingOrders(res.data.pendingOrders);
      })
      .then((error) => {
        console.log(error);
        setShowMessage("Sorry! Something went wrong. Please, try again later.");
      })
  };

  const fetchSingleOrder = (orderId) => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/orders/single-order/${orderId}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setSingleOrder(res.data.singleOrder);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <h5 className="border-bottom border-2 border-dark py-1" id="pendingOrdersHeading">Pending Orders</h5>

      {pendingOrders && <div className="PendingOrders-div"><Table striped bordered hover>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Amount</th>
            <th>Payment</th>
            <th>Availability</th>
            <th>Shipping</th>
            <th className={"text-center"}>View</th>
          </tr>
        </thead>
        <tbody>
          {pendingOrders.map((pendingOrder) => <tr key={pendingOrder._id}>
            <td>{pendingOrder.firstName} {pendingOrder.lastName}</td>
            <td>{pendingOrder.totalPrice}</td>
            <td>{pendingOrder.paymentStatus}</td>
            <td>{pendingOrder.availability}</td>
            <td>{pendingOrder.shippingStatus}</td>
            <td className={"text-center"}>
              <Button
                size={"sm"}
                onClick={() => fetchSingleOrder(pendingOrder._id)}
              >
                View
              </Button>
            </td>
          </tr>)}
        </tbody>
      </Table></div>}

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PendingOrders;