import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyOrder = () => {
  const [loading, setLoading] = useState(true);
  const [orderConfirmation, setOrderConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const orderId = params.get("order_id");

    if (!orderId) {
      navigate("/");
      return;
    }

    axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/orders/verify-order`, { orderId }, { withCredentials: true })
    .then((res) => {
      setOrderConfirmation(res.data.success);
      setConfirmationMessage(res.data.message);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <div style={{ minHeight: "calc(100vh - 100px)" }}>
      {loading && <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>}
      {!loading && orderConfirmation && <div className="container mt-5">
        <h3 className="text-center text-success">{confirmationMessage}</h3>
        <div className="text-center">
          <button className="btn btn-primary">Continue Shopping</button>
        </div>
      </div>}
      {!loading && !orderConfirmation && <div className="container mt-5">
        <h3 className="text-center text-danger">{confirmationMessage}</h3>
        <h5 className="text-center text-secondary">Please try later.</h5>
      </div>}
    </div>
  );
};

export default VerifyOrder;