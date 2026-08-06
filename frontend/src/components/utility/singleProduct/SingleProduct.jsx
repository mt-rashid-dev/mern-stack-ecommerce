import "./SingleProduct.css";
import defaultImage from "../../../assets/image-2935360_1280.png";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { addToCart } from "../../../features/cart/cartSlice";

const SingleProduct = ({ product }) => {
  const theme = useSelector((state) => state.themeReducer.theme);
	const isAddedToCart = useSelector((state) => {
		const index = state.cartReducer.cart.findIndex((item) => item._id === product._id);
		if (index !== -1) {
			return true;
		}
		return false;
	});
	const cart = useSelector((state) => {
		return state.cartReducer.cart;
	});
  const [discountPrice, setDiscountPrice] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
	
	const calculateDiscountPrice = () => {
	  const discountAmount = (product.discount * product.price) / 100;
	  setDiscountPrice(product.price - discountAmount);
	};

  useEffect(() => {
    if (product.discount > 0) {
      calculateDiscountPrice();
    }
    toggleStyle();
  }, [theme]);

  const toggleStyle = () => {
    const singleProducts = document.getElementsByClassName("SingleProduct");

    if (theme === "dark") {
      for (let i = 0; i < singleProducts.length; i++) {
        singleProducts[i].classList.remove("bg-color-light-2");
        singleProducts[i].classList.add("bg-color-dark-2");
      }
    }

    if (theme === "light") {
      for (let i = 0; i < singleProducts.length; i++) {
        singleProducts[i].classList.remove("bg-color-dark-2");
        singleProducts[i].classList.add("bg-color-light-2");
      }
    }
  };
	
	const renderTooltip = (props) => (
	  <Tooltip id="button-tooltip" {...props}>
	    {product.title}
	  </Tooltip>
	);

  return (
    <div className="SingleProduct p-4 text-center">
      <div className="SingleProduct-image-div mb-2 d-flex justify-content-center align-items-center">
        {!product.img && <img
					src={defaultImage}
					alt=""
					className="SingleProduct-image"
				/>}
        {product.img && <img
					src={import.meta.env.VITE_API_BASE_URL + "/" + product.img}
					alt=""
					className="SingleProduct-image"
				/>}
      </div>
			<OverlayTrigger
			  placement="top"
			  delay={{ show: 250, hide: 400 }}
			  overlay={renderTooltip}
			>
				<h5 className="SingleProduct-title fw-bold m-0">{product.title}</h5>
			</OverlayTrigger>
      <p className="SingleProduct-description m-0">{product.description}</p>
      <h6>
				Price: {(product.discount > 0)? <span>
					<strike>${product.price}</strike> <span>${discountPrice}</span>
				</span> : <span>${product.price}</span>}
			</h6>
      <h6 className="mb-2">In-stock: {product.inStock}</h6>
      {!isAddedToCart && <Button
				className="d-block w-75 m-auto mb-1"
				variant="primary"
				onClick={() => dispatch(addToCart(product))}
			>
				Add to Cart
			</Button>}
      {isAddedToCart && <Button
				className="button-disabled d-block w-75 m-auto mb-1"
				variant="secondary"
				disabled
			>
				Added to Cart
			</Button>}
			<Button
				className="d-block w-75 m-auto"
				variant="success"
				onClick={() => navigate(`/product-details?productId=${product._id}`)}
			>
				View Details
			</Button>
    </div>
  );
};

export default SingleProduct;
