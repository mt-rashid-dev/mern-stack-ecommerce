import "./SingleProduct.css";
import defaultImage from "../../../assets/image-2935360_1280.png";
import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

// import { addToCart } from "../../features/cartSlice";

const SingleProduct = ({ product }) => {
  const [discountPrice, setDiscountPrice] = useState(0);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
	
	const calculateDiscountPrice = () => {
	  const discountAmount = (product.discount * product.price) / 100;
	  setDiscountPrice(product.price - discountAmount);
	};

  useEffect(() => {
    if (product.discount > 0) {
      calculateDiscountPrice();
    }
  	// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
	
	const renderTooltip = (props) => (
	  <Tooltip id="button-tooltip" {...props}>
	    {product.title}
	  </Tooltip>
	);

  return (
    <div className="SingleProduct p-4 text-center">
      <div className="SingleProduct-image-div mb-2 d-flex justify-content-center align-items-center">
        {!product.imgPath && <img
					src={defaultImage}
					alt=""
					className="SingleProduct-image"
				/>}
        {product.imgPath && <img
					src={`${import.meta.env.VITE_SERVER_BASE_URL}/${product.imgPath}`}
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
      <Button
				className="d-block w-175 m-auto mb-1"
				variant="primary"
			>
				Add to Cart
			</Button>
			<Button
				className="d-block w-175 m-auto"
				variant="success"
				onClick={() => navigate(`/product-details?productId=${product._id}`)}
			>
				View Details
			</Button>
    </div>
  );
};

export default SingleProduct;
