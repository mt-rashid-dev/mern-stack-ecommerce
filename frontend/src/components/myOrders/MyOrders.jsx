import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import ComponentHeader from "../utility/componentHeader/ComponentHeader";
import { sleep } from "../../helpers";

const MyOrders = () => {
  const [loading, setLoading] = useState(true);
  const [myOrders, setMyOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getMyOrders(1);
  }, []);

  const getMyOrders = (page) => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/orders/my-orders?page=${page}`, { withCredentials: true })
    .then(async (res) => {
      setMyOrders(res.data.myOrders);
      setLoading(await sleep(2000, false));
      setTotalPages(res.data.totalPages);
    })
    .catch(async (error) => {
      setLoading(await sleep(2000, false));
      setErrorMessage(error.response.data.message);
    });
  };

  return (
    <div>
      <ComponentHeader heading="My Orders" component="My-Orders"/>

      {loading && <div className="d-flex w-100 justify-content-center mt-5">
        <Spinner/>
      </div>}

      {(!loading && myOrders.length > 0) && <Container className="mt-5 overflow-x-auto">
        <Table striped bordered hover className="align-middle">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Shipping</th>
              <th className="text-center">View Details</th>
            </tr>
          </thead>
          <tbody>
            {myOrders.map(myOrder => <tr key={myOrder._id}>
              <td>{myOrder._id}</td>
              <td>${myOrder.totalPrice}</td>
              <td>{myOrder.paymentStatus}</td>
              <td>{myOrder.shippingStatus}</td>
              <td className="text-center">
                <Button size="sm">View</Button>
              </td>
            </tr>)}
          </tbody>
        </Table>
        {totalPages > 0 && <div className="mt-5 text-center text-secondary">
          <Button variant="outline-secondary">&lt;</Button>
          <span> {currentPage}</span>
          <span> / </span>
          <span>{totalPages} </span>
          <Button variant="outline-secondary">&gt;</Button>
        </div>}
      </Container>}
    </div>
  );
};

export default MyOrders;