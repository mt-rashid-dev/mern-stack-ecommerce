import "./PendingOrders.css";
import defaultImage from "../../../assets/image-2935360_1280.png";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";

import { sleep } from "../../../helpers";

const PendingOrders = () => {
  const theme = useSelector((state) => state.themeReducer.theme);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [singleOrder, setSingleOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deliverButton, setDeliverButton] = useState("Deliver Order");
  const [isLoadingDeliver, setIsLoadingDeliver] = useState(false);
  const [shippingMessage, setShippingMessage] = useState("")
  const [shippingError, setShippingError] = useState("");

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
        console.log("Sorry! Something went wrong. Please, try again later.");
      });
  };

  const fetchSingleOrder = (orderId) => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/orders/single-order/${orderId}`, { withCredentials: true })
      .then((res) => {
        // console.log(res.data);
        setSingleOrder(res.data.singleOrder);
        handleShow();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deliverOrder = () => {
    setShippingError("");
    setDeliverButton(<Spinner animation="border" role="status" size="sm">
      <span className="visually-hidden">Loading...</span>
    </Spinner>);
    setIsLoadingDeliver(true);
    axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/orders/single-order`, { orderId: singleOrder._id }, { withCredentials: true })
      .then(res => {
        console.log(res.data);
        if (res.data.isFound === false) {
          setShippingMessage(res.data.message);
        } else {
          // show toast
        }
      })
      .catch(async error => {
        console.log(error);
        const value = await sleep(1000, false);
        setDeliverButton("Deliver Order");
        setIsLoadingDeliver(value);
        setShippingError("Sorry! Something went wrong. Please, try again.");
      });
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div>
      <h5 className="border-bottom border-2 border-dark py-1" id="pendingOrdersHeading">Pending Orders</h5>

      {pendingOrders.length === 0 && <div className="d-flex justify-content-center mt-3">
        <Spinner animation="border" role="status" size="sm">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>}

      {pendingOrders.length > 0 && <div className="PendingOrders-div"><Table striped bordered hover>
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

      {/* Modal - view order info */}
      {singleOrder && <Modal show={showModal} onHide={handleClose}>
        {/* Modal header */}
        <Modal.Header closeButton>
          <Modal.Title>Order Info</Modal.Title>
        </Modal.Header>

        {/* Modal body */}
        <Modal.Body>
          <Table>
            {/* Display customer info and order status */}
            <tbody>
              <tr>
                {/* wtcol = width of table column */}
                <td className="PendingOrders-wtcol">Customer Name</td>
                <td>{singleOrder.firstName} {singleOrder.lastName}</td>
              </tr>
              <tr>
                <td>Customer Email</td>
                <td>{singleOrder.email}</td>
              </tr>
              <tr>
                <td>Total Price</td>
                <td>${singleOrder.totalPrice}</td>
              </tr>
              <tr>
                <td>Payment Status</td>
                <td>{singleOrder.paymentStatus}</td>
              </tr>
              <tr>
                <td>Shipping Status</td>
                <td>{singleOrder.shippingStatus}</td>
              </tr>
            </tbody>
          </Table>

          {/* Button - deliver order */}
          <Button
            variant="success"
            className="d-block w-100 mb-3"
            disabled={isLoadingDeliver}
            onClick={deliverOrder}
          >
            {deliverButton}
          </Button>
          {shippingError && <p className="text-danger">{ shippingError}</p>}

          {/* Display cart items */}
          {singleOrder.cartItems.map(item => <div key={item._id}>
            {/* pidiv = product image div */}
            <div className={theme === "light" ? "bg-color-light-3 PendingOrders-pidiv" : "bg-color-dark-3 PendingOrders-pidiv"}>
              {item.productImage && <Image src={import.meta.env.VITE_API_BASE_URL + "/" + item.productImage} className="h-100" alt="Cart item"/>}
              {!item.productImage && <Image src={defaultImage} className="h-100" alt="Cart item"/>}
            </div>
            <Table>
              <tbody>
                <tr>
                  {/* wtcol = width of table column */}
                  <td className="PendingOrders-wtcol">Product Title</td>
                  <td>{item.productTitle}</td>
                </tr>
                <tr>
                  <td>Discount</td>
                  <td>{item.discount}%</td>
                </tr>
                <tr>
                  <td>Price</td>
                  {item.discount === 0 && <td>{item.price}</td>}
                  {item.discount > 0 && <td><strike>${item.price}</strike> ${item.price - item.price * item.discount / 100}</td>}
                </tr>
                <tr>
                  <td>Quantity</td>
                  <td>{item.quantity}</td>
                </tr>
                <tr>
                  <td>In-stock</td>
                  {item.outOfStock ? <td>
                    Out of stock
                  </td> : <td>
                    Available
                  </td>}
                </tr>
              </tbody>
            </Table>
          </div>)}
        </Modal.Body>

        {/* Modal footer */}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>}
    </div>
  );
};

export default PendingOrders;
