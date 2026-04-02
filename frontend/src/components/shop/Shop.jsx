import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import ComponentHeader from "../utility/componentHeader/ComponentHeader";
import SingleProduct from "../utility/singleProduct/SingleProduct";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(12);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    // const urlParams = new URLSearchParams(window.location.search);
    fetchProducts(1, 12, "");
  }, []);

  const changeCategory = (value) => {
    history.pushState(null, "", `?category=${value}`);
    setCategory(value);
  };

  const fetchProducts = (page, limit, search) => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products?page=${page}&limit=${limit}&search=${search}`)
    .then(res => {
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
    })
    .catch(error => console.log(error));
  };

  return (
    <div className="w-max">
      {/* Component Header */}
      <ComponentHeader heading="Products" component="Shop"/>

      {/* Products Section */}
      <Container fluid>
        <div
				  className="d-flex justify-content-between align-items-center border-bottom border-1 border-dark my-3 pb-2"
					id="cBorder"
				>
          <DropdownButton
            id="dropdown-basic-button"
            title={`Category: ${category}`}
            variant="success"
          >
            <Dropdown.Item
              href={null}
              onClick={() => changeCategory("All")}
            >
              All
            </Dropdown.Item>
            <Dropdown.Item
              href={null}
              onClick={() => changeCategory("Smartphone")}
            >
              Smartphone
            </Dropdown.Item>
            <Dropdown.Item
              href={null}
              onClick={() => changeCategory("Airpods")}
            >
              Airpods
            </Dropdown.Item>
            <Dropdown.Item
              href={null}
              onClick={() => changeCategory("Wristwatch")}
            >
              Wristwatch
            </Dropdown.Item>
            <Dropdown.Item
              href={null}
              onClick={() => changeCategory("Video Camera")}
            >
              Video Camera
            </Dropdown.Item>
            <Dropdown.Item
              href={null}
              onClick={() => changeCategory("Webcam")}
            >
              Webcam
            </Dropdown.Item>
            <Dropdown.Item
              href={null}
              onClick={() => changeCategory("Wireless Speaker")}
            >
              Wireless Speaker
            </Dropdown.Item>
          </DropdownButton>
          <DropdownButton id="dropdown-basic-button" title="Dropdown button">
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </DropdownButton>
				</div>
        <Row xs={1} sm={2} md={3} lg={4} xl={6} className="g-3">
          {products.map(product => <Col>
            <SingleProduct product={product}/>
          </Col>)}
        </Row>
        <div className="text-center my-3">
          <Button
            variant="outline-dark"
          >
            &lt;
          </Button>&nbsp;&nbsp;
          <span>
            {currentPage} / {totalPages}
          </span>&nbsp;&nbsp;
          <Button
            variant="outline-dark"
          >
            &gt;
          </Button>&nbsp;&nbsp;
        </div>
      </Container>
    </div>
  );
};

export default Shop;