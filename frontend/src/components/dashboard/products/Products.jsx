import "./Products.css";
import defaultImage from "../../../assets/image-2935360_1280.png";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Products = () => {
  const theme = useSelector((state) => state.themeReducer.theme);
  const [products, setProducts] = useState(null);
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [show, setShow] = useState(false);
  const [singleProduct, setSingleProduct] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(0);

  useEffect(() => {
    toggleStyle();
    fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/products?page=1&limit=10`);
    calculateDiscountPrice();
  }, [theme, singleProduct]);

  const toggleStyle = () => {
    const heading = document.getElementById("productsHeading");

    if (theme === "dark") {
      heading.classList.remove("border-dark");
      heading.classList.add("border-light")
    }

    if (theme === "light") {
      heading.classList.remove("border-light");
      heading.classList.add("border-dark");
    }
  };

  const fetchData = (url) => {
    axios.get(url, { withCredentials: true })
      .then((res) => {
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchSingleProduct = (productId) => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products/get-product/${productId}`, { withCredentials: true })
      .then((res) => {
        setSingleProduct(res.data.product);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const changeCategory = (value) => {
    setCategory(value);
    fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/products?page=${page}&limit=${limit}&search=${value}`);
  };

  const changeLimit = (value) => {
    setLimit(value);
    fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/products?page=${page}&limit=${value}&search=${category}`);
  };

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/products?page=${page-1}&limit=${limit}&search=${category}`)
    }
  };

  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/products?page=${page+1}&limit=${limit}&search=${category}`)
    }
  };

  const calculateDiscountPrice = () => {
    if (singleProduct !== null) {
      const discountAmount = (singleProduct.discount * singleProduct.price) / 100;
      setDiscountPrice(singleProduct.price - discountAmount);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <h5 className="border-bottom border-2 border-dark py-1" id="productsHeading">Products</h5>

      {/* Products div */}
      {products && <div className="Products-div">
        {/* Filter div */}
        <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Category: {category}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => changeCategory("All")}>All</Dropdown.Item>
              <Dropdown.Item onClick={() => changeCategory("Smartphone")}>Smartphone</Dropdown.Item>
              <Dropdown.Item onClick={() => changeCategory("Wristwatch")}>Wristwatch</Dropdown.Item>
              <Dropdown.Item onClick={() => changeCategory("Video Camera")}>Video Camera</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Show {limit} items
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => changeLimit(10)}>10</Dropdown.Item>
              <Dropdown.Item onClick={() => changeLimit(15)}>15</Dropdown.Item>
              <Dropdown.Item onClick={() => changeLimit(20)}>20</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product Title</th>
              <th>Discount (%)</th>
              <th>Price ($)</th>
              <th className={"text-center"}>View Details</th>
            </tr>
          </thead>
          <tbody>{products.map(product => <tr key={product._id}>
            <td>{product.title}</td>
            <td>{product.discount}</td>
            <td>{product.price}</td>
            <td className={"text-center"}>
              <Button
                size={"sm"}
                onClick={() => {
                  handleShow();
                  fetchSingleProduct(product._id);
                }}
              >
                View
              </Button>
            </td>
          </tr>)}</tbody>
        </Table>

        {/* Pagination */}
        {totalPages > 0 && <div className="text-center mb-3">
          <Button
            variant="secondary"
            onClick={previousPage}
          >
            <i>&lt;</i>
          </Button>&nbsp;
          <span>{page} / {totalPages}</span>&nbsp;
          <Button
            variant="secondary"
            onClick={nextPage}
          >
            &gt;
          </Button>
        </div>}
      </div>}

      {/* Product modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* spic = single product image container */}
          <div className={"Products-spic py-2 rounded-3"}>
            {singleProduct?.img && <img src={import.meta.env.VITE_API_BASE_URL + "/" + singleProduct?.img} alt={""}/>}
            {!singleProduct?.img && <img src={defaultImage} alt={""}/>}
          </div>
          <Table>
            <tbody>
              <tr>
                <td>Product ID</td>
                <td>{singleProduct?._id}</td>
              </tr>
              <tr>
                <td>Product Name</td>
                <td>{singleProduct?.title}</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>{singleProduct?.description}</td>
              </tr>
              <tr>
                <td>Category</td>
                <td>{singleProduct?.category}</td>
              </tr>
              <tr>
                <td>Discount</td>
                <td>{singleProduct?.discount}%</td>
              </tr>
              <tr>
                <td>Price</td>
                <td>
                  {(singleProduct?.discount === 0)? <span>
                    ${singleProduct?.price}
                  </span> : <span>
                    <strike>${singleProduct?.price}</strike>&nbsp;
                    ${discountPrice}
                  </span>}
                </td>
              </tr>
              <tr>
                <td>In-Stock</td>
                <td>{singleProduct?.inStock}</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Products;