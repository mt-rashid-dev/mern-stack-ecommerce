import "./Cart.css";
import defaultImage from "../../assets/image-2935360_1280.png";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import { increment, decrement } from "../../features/cart/cartSlice";
import ComponentHeader from "../utility/componentHeader/ComponentHeader";

const Cart = () => {
  const theme = useSelector((state) => state.themeReducer.theme);
  const cart = useSelector((state) => state.cartReducer.cart);
  const total = useSelector((state) => state.cartReducer.total);
  const dispatch = useDispatch();

  useEffect(() => {
    toggleStyle();
  }, [theme]);

  const toggleStyle = () => {
    const cartItems = document.getElementsByClassName("Cart-item");
    const cartQuantity = document.getElementsByClassName("Cart-quantity");


    if (theme === "dark") {
      for (let i = 0; i < cartItems.length; i++) {
        cartItems[i].classList.remove("bg-color-AliceBlue");
        cartItems[i].classList.add("bg-color-DarkSlateGray");
      }
      for (let i = 0; i < cartQuantity.length; i++) {
        cartQuantity[i].classList.remove("btn-outline-dark");
        cartQuantity[i].classList.add("btn-outline-light");
      }
    }

    if (theme === "light") {
      for (let i = 0; i < cartItems.length; i++) {
        cartItems[i].classList.remove("bg-color-DarkSlateGray");
        cartItems[i].classList.add("bg-color-AliceBlue");
      }
      for (let i = 0; i < cartQuantity.length; i++) {
        cartQuantity[i].classList.remove("btn-outline-light");
        cartQuantity[i].classList.add("btn-outline-dark");
      }
    }
  };

  return (
    <div>
      <ComponentHeader heading="Shopping Cart" component="Cart"/>

      <Container className="my-3">
        {cart.map(item => <div
          key={item._id}
          className="Cart-item d-flex mb-2 p-2 bg-color-AliceBlue rounded-3"
        >
          <div className="Cart-image bg-light rounded-3 d-flex align-items-center">
            {item.img !== "" && <img
              src={item.img}
              alt=""
              className="rounded-3"
            />}
            {item.img === "" && <img
              src={defaultImage}
              alt=""
              className="rounded-3"
            />}
          </div>
          <div className="flex-fill px-2">
            <h3 className="fw-bold">{item.title}</h3>
            <div className="d-flex justify-content-between">
              <p>
                {item.price > item.discountedPrice? <span>
                  <strike>${item.price}</strike> <span>${item.discountedPrice.toFixed(2)}</span>
                </span> : <span>${item.price}</span>}
              </p>
              <p className="fw-bold">${item.discountedPrice*item.quantity.toFixed(2)}</p>
            </div>
            <div className="mt-2">
              <Button
                variant="outline-dark"
                className="Cart-quantity small-button p-0"
                onClick={() => dispatch(decrement(item._id))}
              >
                <i className="bi bi-dash"></i>
              </Button>&nbsp;
              <span>{item.quantity}</span>&nbsp;
              <Button
                variant="outline-dark"
                className="Cart-quantity small-button p-0"
                onClick={() => dispatch(increment(item._id))}
              >
                <i className="bi bi-plus"></i>
              </Button>
            </div>
          </div>
        </div>)}
        <h6 className="fw-bold text-end">Total: ${total.toFixed(2)}</h6>
        <Button
          variant="primary"
          className="d-block w-100"
        >
          Checkout
        </Button>
      </Container>
    </div>
  );
};

export default Cart;