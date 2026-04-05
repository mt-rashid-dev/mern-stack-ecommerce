import "./MiniCart.css";
import defaultImage from "../../../assets/image-2935360_1280.png";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

import { increment, decrement } from "../../../features/cart/cartSlice";

const MiniCart = () => {
  const theme = useSelector((state) => state.themeReducer.theme);
  const cart = useSelector((state) => state.cartReducer.cart);
  const total = useSelector((state) => state.cartReducer.total);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    toggleStyle();
  }, [theme]);

  const toggleStyle = () => {
    const miniCartQuantity = document.getElementsByClassName("MiniCart-quantity");
    
    if (theme === "dark") {
      for (let i = 0; i < miniCartQuantity.length; i++) {
        miniCartQuantity[i].classList.remove("btn-outline-dark");
        miniCartQuantity[i].classList.add("btn-outline-light");
      }
    }

    if (theme === "light") {
      for (let i = 0; i < miniCartQuantity.length; i++) {
        miniCartQuantity[i].classList.remove("btn-outline-light");
        miniCartQuantity[i].classList.add("btn-outline-dark");
      }
    }
  };

  return (
    <div>
      <div className="MiniCart-products">
        {cart.map(item => <div
          key={item._id}
          className="d-flex mb-2"
        >
          <div className="MiniCart-image bg-light">
            {item.img !== "" && <img
              src={item.img}
              alt=""
            />}
            {item.img === "" && <img
              src={defaultImage}
              alt=""
            />}
          </div>
          <div className="flex-fill px-2">
            <h5 className="fw-bold p-0 m-0">{item.title}</h5>
            <div className="d-flex justify-content-between fw-bold pb-3">
              <p className="m-0 p-0 pe-2">
                {item.price > item.discountedPrice? <span>
                  <strike>${item.price}</strike> <span>${item.discountedPrice.toFixed(2)}</span>
                </span> : <span>${item.price}</span>}
              </p>
              <p className="m-0 p-0">${item.discountedPrice*item.quantity.toFixed(2)}</p>
            </div>
            <div>
              <Button
                variant="outline-dark"
                className="MiniCart-quantity small-button p-0"
                onClick={() => dispatch(decrement(item._id))}
              >
                <i className="bi bi-dash"></i>
              </Button>&nbsp;
              <span>{item.quantity}</span>&nbsp;
              <Button
                variant="outline-dark"
                className="MiniCart-quantity small-button p-0"
                onClick={() => dispatch(increment(item._id))}
              >
                <i className="bi bi-plus"></i>
              </Button>
            </div>
          </div>
        </div>)}
      </div>
      <div className="MiniCart-info">
        <h6 className="fw-bold text-end">Total: ${total.toFixed(2)}</h6>
        <Button
          variant="secondary"
          className="d-block w-100 mb-2"
          onClick={() => navigate("/cart")}
        >
          View Cart
        </Button>
        <Button
          variant="primary"
          className="d-block w-100"
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default MiniCart;