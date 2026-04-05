import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import ComponentHeader from "../utility/componentHeader/ComponentHeader";
import SingleProduct from "../utility/singleProduct/SingleProduct";

const Shop = () => {
  const theme = useSelector((state) => state.themeReducer.theme);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(12);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // const urlParams = new URLSearchParams(window.location.search);
    if (loading) {
      fetchProducts(1, 12, "");
    }
    toggleStyle();
  }, [theme]);

  const changeCategory = (value) => {
    if (category !== "All") {
      history.pushState(null, "", `?category=${value}`);
    }
    setCategory(value);
    fetchProducts(currentPage, limit, value);
  };

  const changeLimit = (value) => {
    setLimit(value);
    fetchProducts(currentPage, value, category);
  };

  const fetchProducts = (page, limit, search) => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products?page=${page}&limit=${limit}&search=${search}`)
    .then(res => {
      if (res.data.success === true) {
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
      } else {
        setMessage(res.data.message);
      }
      setLoading(false);
    })
    .catch(error => console.log(error));
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      fetchProducts(currentPage - 1, limit, category);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      fetchProducts(currentPage + 1, limit, category);
    }
  };

  const toggleStyle = () => {
    // pdHeader = products header
    const pdHeader = document.getElementById("pdHeader");
    // page navigation 
    const pages = document.getElementsByClassName("Shop-pages");

    // Change style for dark theme

    if (theme === "dark") {
      pdHeader.classList.remove("border-dark");
      pdHeader.classList.add("border-light");
      for (let i = 0; i < pages.length; i++) {
        pages[i].classList.remove("btn-outline-dark");
        pages[i].classList.add("btn-outline-light");
      }
    }

    if (theme === "light") {
      pdHeader.classList.remove("border-light");
      pdHeader.classList.add("border-dark");
      for (let i = 0; i < pages.length; i++) {
        pages[i].classList.remove("btn-outline-light");
        pages[i].classList.add("btn-outline-dark");
      }
    }
  }

  return (
    <div className="w-max">
      {/* Component Header */}
      <ComponentHeader heading="Products" component="Shop"/>

      {/* Products Section */}
      <Container fluid>
        {/* pdHeader = products header */}
        <div
				  className="d-flex justify-content-between align-items-center border-bottom border-1 border-dark my-3 pb-2"
					id="pdHeader"
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
          <DropdownButton
            id="dropdown-basic-button"
            title={`Show ${limit} Items`}
            variant="success"
            align="end"
          >
            <Dropdown.Item
              href={null}
              onClick={() => changeLimit(12)}
            >
              12
            </Dropdown.Item>
            <Dropdown.Item
              href={null}
              onClick={() => changeLimit(24)}
            >
              24
            </Dropdown.Item>
            <Dropdown.Item
              href={null}
              onClick={() => changeLimit(36)}
            >
              36
            </Dropdown.Item>
          </DropdownButton>
				</div>
        <Row xs={1} sm={2} md={3} lg={4} xxl={6} className="g-3">
          {products.map(product => <Col key={product._id}>
            <SingleProduct product={product}/>
          </Col>)}
        </Row>
        <div className="text-center my-3">
          <Button
            variant="outline-dark"
            className="Shop-pages"
            onClick={() => prevPage()}
          >
            &lt;
          </Button>&nbsp;&nbsp;
          <span>
            {currentPage} / {totalPages}
          </span>&nbsp;&nbsp;
          <Button
            variant="outline-dark"
            className="Shop-pages"
            onClick={() => nextPage()}
          >
            &gt;
          </Button>&nbsp;&nbsp;
        </div>
      </Container>
    </div>
  );
};

export default Shop;