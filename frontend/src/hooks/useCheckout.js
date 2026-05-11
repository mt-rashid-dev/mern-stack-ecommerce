import axios from "axios";

const useCheckout = () => {
  const checkout = (orderData) => {
    axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/orders/checkout`, orderData, { withCredentials: true })
    .then((res) => {
      console.log(res.data);
      window.location.href = res.data.sessionURL;
    })
    .catch(error => console.log(error));
  };

  return { checkout };
};

export default useCheckout;