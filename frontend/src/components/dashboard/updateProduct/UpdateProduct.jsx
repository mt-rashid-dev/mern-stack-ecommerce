import "./UpdateProduct.css";
import defaultImage from "../../../assets/image-2935360_1280.png";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import { sleep } from "../../../helpers";
import ToastBox from "../../utility/toastBox/ToastBox";

const UpdateProduct = () => {
  const theme = useSelector(state => state.themeReducer.theme);
  const [productId, setProductId] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [discount, setDiscount] = useState(0);
  const [price, setPrice] = useState(0);
  const [inStock, setInStock] = useState(0);
  const [searchButton, setSearchButton] = useState("Search");
  const [updateButton, setUpdateButton] = useState("Update");
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
    const heading = document.getElementById("updateProductHeading");

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
    setNewImage(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setShowMessage("");
    setSearchButton(<Spinner variant="light" size="sm"/>);
    setIsFound(false);
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products/get-product/${productId}`, { withCredentials: true })
      .then(async (res) => {
        console.log(res.data);
        setCurrentImage(res.data.product.img);
        setTitle(res.data.product.title);
        setDescription(res.data.product.description);
        setCategory(res.data.product.category);
        setDiscount(res.data.product.discount);
        setPrice(res.data.product.price);
        setInStock(res.data.product.inStock);
        const value = await sleep(3000, "Search");
        setSearchButton(value);
        setIsFound(true);
      })
      .catch(async (error) => {
        const value = await sleep(3000, "Search");
        setSearchButton(value);
        if (error.response.data?.errorStatus === "not found") {
          setShowMessage("Sorry! The product was not found");
        } else {
          setShowMessage("Sorry! Something went wrong. Please try again later");
        }
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setUpdateButton(<Spinner variant="light" size="sm"/>)
    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("newImage", newImage);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("discount", discount);
    formData.append("price", price);
    formData.append("inStock", inStock);
    axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/products`, formData, { withCredentials: true })
      .then(async (res) => {
        setToastHeading("New Message");
        setToastMessage(res.data.message);
        setToastSuccess(true);
        const value = await sleep(3000, "Update");
        setUpdateButton(value);
        setShowToast(res.data.success);
        setShowToast(await sleep(3000, false));
      })
      .catch(async (error) => {
        if (error.response.data?.errorStatus === "update unsuccessful") {
          setToastHeading("New Message");
          setToastMessage(error.response.data.message);
          setToastSuccess(error.response.data.success);
        } else {
          setToastHeading("New Message");
          setToastMessage("Sorry! Something went wrong. Please try later");
          setToastSuccess(false);
        }
        const value = await sleep(3000, "Update");
        setUpdateButton(value);
        setShowToast(true);
        setShowToast(await sleep(3000, false));
      });
  };

  return (
    <div>
      <h5 className="border-bottom border-2 border-dark py-1" id="updateProductHeading">Update a Product</h5>

      <div className="UpdateProduct-form-div">
        <Form className="mb-3" onSubmit={handleSearch}>
          <Form.Group className="mb-3" controlId="productId">
            <Form.Label>Product Id</Form.Label>
            <Form.Control
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" className="d-block w-100">{searchButton}</Button>
        </Form>

        {isFound && <Form className="mb-3" encType="multipart/form-data" onSubmit={handleUpdate}>
          <div className="UpdateProduct-image-div">
            {(!previewImage && !currentImage) && <img src={defaultImage} alt=""/>}
            {(!previewImage && currentImage) && <img src={currentImage} alt=""/>}
            {previewImage && <img src={previewImage} alt=""/>}
          </div>
          <Form.Group className="mb-3" controlId="newImage">
            <Form.Label>Select New Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={selectImage}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="editTitle">
            <Form.Label>Edit Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="editDescription">
            <Form.Label>Edit Description</Form.Label>
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="editCategory">
            <Form.Label>Edit Category</Form.Label>
            <Form.Select
              aria-level="Edit Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Change Category</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Wristwatch">Wristwatch</option>
              <option value="Video Camera">Video Camera</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="editDiscount">
            <Form.Label>Edit Discount</Form.Label>
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
          <Form.Group className="mb-3" controlId="editPrice">
            <Form.Label>Edit Price (USD)</Form.Label>
            <Form.Control
              type="number"
              min={0}
              step={1}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="editInStock">
            <Form.Label>Edit In-Stock</Form.Label>
            <Form.Control
              type="number"
              min={0}
              step={1}
              value={inStock}
              onChange={(e) => setInStock(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" className="d-block w-100">{updateButton}</Button>
        </Form>}

        {showMessage !== "" && <h3 className="text-center">{showMessage}</h3>}
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

export default UpdateProduct;