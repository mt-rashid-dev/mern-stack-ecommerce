import "./NewProduct.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { sleep } from "../../../helpers";
import ToastBox from "../../utility/toastBox/ToastBox";

const NewProduct = () => {
  const theme = useSelector(state => state.themeReducer.theme);
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [discount, setDiscount] = useState(0);
  const [price, setPrice] = useState(0);
  const [inStock, setInStock] = useState(0);
  const [toastMessage, setToastMessage] = useState("");
  const [toastHeading, setToastHeading] = useState("");
  const [toastSuccess, setToastSuccess] = useState(true);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    toggleStyle();
  }, [theme]);

  const toggleStyle = () => {
    const heading = document.getElementById("newProductHeading");

    if (theme === "dark") {
      heading.classList.remove("border-dark");
      heading.classList.add("border-light");
    }

    if (theme === "light") {
      heading.classList.remove("border-light");
      heading.classList.add("border-dark");
    }
  };

  const selectImage = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  }

  const handleAddProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productImage", productImage);
    formData.append("productTitle", productTitle);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("discount", discount);
    formData.append("price", price);
    formData.append("inStock", inStock);
    axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/products`, formData, { 
      headers: {
        "Content-Type": "multipart/form-data"
      },
      withCredentials: true
    })
    .then(async (res) => {
      resetForm();
      setToastMessage(res.data.message);
      setToastHeading("New Message");
      setToastSuccess(res.data.success);
      setShowToast(true);
      setShowToast(await sleep(3000, false));
    })
    .catch(async (error) => {
      console.log(error);
      setToastMessage("Internal server error");
      setToastHeading("New Message");
      setToastSuccess(error?.response?.data?.success);
      setShowToast(true);
      setShowToast(await sleep(3000, false));
    });
  };

  const resetForm = () => {
    setProductImage(null);
    setProductTitle("");
    setDescription("");
    setCategory("");
    setDiscount(0);
    setPrice(0);
    setInStock(0);
  };
  
  return (
    <div>
      <h5 className="border-bottom border-2 border-dark py-1" id="newProductHeading">Add New Product</h5>

      <div className="NewProduct-form-div">
        <div className="NewProduct-image-div my-3 rounded-3">
          {!imagePreview && <h5 className="text-light text-center px-3 rounded-3">No image selected</h5>}
          {imagePreview && <img src={imagePreview} alt=""/>}
        </div>
        <Form encType="multipart/form-data" onSubmit={handleAddProduct}>
          <Form.Group className="mb-3" controlId="inputFile">
            <Form.Label>Product Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={selectImage}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="inputText">
            <Form.Label>Product Title</Form.Label>
            <Form.Control
              type="text"
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="inputText">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="selectCategory">
            <Form.Label>Select a Category</Form.Label>
            <Form.Select
              aria-label="Select a Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select a Category</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Wristwatch">Wristwatch</option>
              <option value="Video Camera">Video Camera</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="inputNumber">
            <Form.Label>Discount</Form.Label>
            <Form.Control
              type="number"
              min={0}
              max={100}
              step={1}
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="inputNumber">
            <Form.Label>Price (USD)</Form.Label>
            <Form.Control
              type="number"
              min={0}
              step={1}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="inputNumber">
            <Form.Label>In-Stock</Form.Label>
            <Form.Control
              type="number"
              min={0}
              step={1}
              value={inStock}
              onChange={(e) => setInStock(e.target.value)}
              required
            />
          </Form.Group>
          <Button
            type="submit"
            variant="success"
            className="d-block w-100 mb-3"
          >Add Product</Button>
        </Form>
      </div>

      {showToast && <ToastBox
        heading={toastHeading}
        message={toastMessage}
        success={toastSuccess}
        setShowToast={setShowToast}
      />}
    </div>
  );
};

export default NewProduct;