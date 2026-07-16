import "./DeleteProduct.css";
import defaultImage from "../../../assets/image-2935360_1280.png";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table"

import { sleep } from "../../../helpers.js";
import ToastBox from "../../utility/toastBox/ToastBox.jsx";

const DeleteProduct = () => {
  const theme = useSelector(state => state.themeReducer.theme);
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [deleteButton, setDeleteButton] = useState("Delete");
  const [confirmButton, setConfirmButton] = useState("Confirm Delete");
  const [showMessage, setShowMessage] = useState("");
  const [isFound, setIsFound] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastHeading, setToastHeading] = useState("");
  const [toastSuccess, setToastSuccess] = useState(true);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    toggleStyle();
  }, [theme]);

  const toggleStyle = () => {
    const heading = document.getElementById("deleteProductHeading");

    if (theme === "dark") {
      heading.classList.remove("border-dark");
      heading.classList.add("border-light");
    }

    if (theme === "light") {
      heading.classList.remove("border-light");
      heading.classList.add("border-dark");
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setShowMessage("");
    setDeleteButton(<Spinner variant="light" size="sm"/>);
    setIsFound(false);
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products/get-product/${productId}`, { withCredentials: true })
      .then(async (res) => {
        setProduct(res.data.product);
        const value = await sleep(3000, "Delete");
        setDeleteButton(value);
        setIsFound(true);
      })
      .catch(async (error) => {
        const value = await sleep(3000, "Delete")
        setDeleteButton(value);
        if (error.response.data?.errorStatus === "not found") {
          setShowMessage("Sorry! The product was not found");
        } else {
          setShowMessage("Sorry! Something went wrong. Please try again later");
        }
      });
  };

  const handleConfirmDelete = () => {
    setConfirmButton(<Spinner variant="light" size="sm"/>);
    axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/products/${productId}`, { withCredentials: true })
      .then(async (res) => {
        let value = await sleep(3000, "Confirm Delete");
        setConfirmButton(value);
        setToastMessage(res.data.message);
        setToastHeading("New Message");
        setToastSuccess(res.data.success);
        setShowToast(true);
        setProduct(null);
        setProductId("");
        value = await sleep(3000, false);
        setShowToast(value);
      })
      .catch(async (error) => {
        console.log(error);
        let value = await sleep(3000, "Confirm Delete");
        setConfirmButton(value);
        setToastMessage("Sorry! Something went wrong. Please, try again later");
        setToastHeading("New Message");
        setToastSuccess(error.response.data.success);
        setShowToast(true);
        value = await sleep(3000, false);
        setShowToast(value);
      });
  };

  return (
    <div>
      <h5 className="border-bottom border-2 border-dark py-1" id="deleteProductHeading">Delete Product</h5>

      <div className="DeleteProduct-form-div">
        <Form className="mb-3" onSubmit={handleDelete}>
          <Form.Group className="mb-3" controlId="productId">
            <Form.Label>Product Id</Form.Label>
            <Form.Control
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant={"danger"} type="submit" className="d-block w-100">{deleteButton}</Button>
        </Form>

        {(product && isFound) && <div>
          {/* ic = image container */}
          <div className={"DeleteProduct-ic py-2 rounded-3"}>
            {product.img && <img src={import.meta.env.VITE_API_BASE_URL + "/" + product.img} alt={""}/>}
            {!product.img && <img src={defaultImage} alt={""}/>}
          </div>
          <Table>
            <tbody>
            <tr>
              <td>Product ID</td>
              <td>{product._id}</td>
            </tr>
            <tr>
              <td>Product Name</td>
              <td>{product.title}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{product.description}</td>
            </tr>
            <tr>
              <td>Category</td>
              <td>{product.category}</td>
            </tr>
            <tr>
              <td>Discount</td>
              <td>{product.discount}%</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>
                {(product.discount === 0)? <span>
                    ${product.price}
                  </span> : <span>
                    <strike>${product.price}</strike>&nbsp;
                  ${discountPrice}
                  </span>}
              </td>
            </tr>
            <tr>
              <td>In-Stock</td>
              <td>{product.inStock}</td>
            </tr>
            </tbody>
          </Table>

          <h6>Do you want to delete this product?</h6>
          <Button
            variant={"warning"}
            className={"d-block w-100 mb-2"}
            onClick={handleConfirmDelete}
          >
            {confirmButton}
          </Button>
        </div>}

        {showMessage !== "" && <h3 className="text-center">{showMessage}</h3>}
      </div>

      {/* Toast box */}
      {showToast && <ToastBox heading={toastHeading} message={toastMessage} success={toastSuccess} setShowToast={setShowToast}/>}
    </div>
  );
};

export default DeleteProduct;