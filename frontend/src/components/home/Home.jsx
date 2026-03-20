import "./Home.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import carouselImg1 from "../../assets/carousel-img-1.jpg";
import carouselImg2 from "../../assets/carousel-img-2.jpg";
import carouselImg3 from "../../assets/carousel-img-3.jpg";

const Home = () => {
	const theme = useSelector((state) => state.themeReducer.theme);
  const [index, setIndex] = useState(0);
	const [categoryButton, setCategoryButton] = useState("dark")
	
	const toggleStyle = () => {
		// wcu = why choose us
		const wcu = document.getElementsByClassName("Home-wcu");
		// cBorder = category border
		const cBorder = document.getElementById("cBorder");

		// Change style for dark theme
		if (theme === "dark") {
			for (let i = 0; i < wcu.length; i++) {
				wcu[i].classList.remove("border-dark");
				wcu[i].classList.add("border-light");
			}
			cBorder.classList.remove("border-dark");
			cBorder.classList.add("border-light");
			setCategoryButton("secondary");
		}

		// Change style for light theme
		if (theme === "light") {
			for (let i = 0; i < wcu.length; i++) {
				wcu[i].classList.remove("border-light");
				wcu[i].classList.add("border-dark");
			}
			cBorder.classList.remove("border-light");
			cBorder.classList.add("border-dark");
			setCategoryButton("dark");
		}
	};
	
	useEffect(() => {
		toggleStyle();
	  // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [theme]);

  const handleSelect = (selectedIndex) => {
		setIndex(selectedIndex);
  };

  return (
		<div className="w-max">
		  {/* Carousel Section */}
		  <Carousel activeIndex={index} onSelect={handleSelect} className="w-100">
		    <Carousel.Item className="w-100">
			  {/* ci = carousel image */}
		      <img
				    className="Home-ci"
				    src={carouselImg1}
						alt=""
			  	/>
		      <Carousel.Caption>
		        <h3>First slide label</h3>
		        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
		      </Carousel.Caption>
		    </Carousel.Item>
				<Carousel.Item>
				  {/* ci = carousel image */}
				  <img
				    className="Home-ci"
				    src={carouselImg2}
						alt=""
				  />
				  <Carousel.Caption>
				    <h3>Second slide label</h3>
				    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
				  </Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
				  {/* ci = carousel image */}
				  <img
				    className="Home-ci"
				    src={carouselImg3}
						alt=""
				  />
				  <Carousel.Caption>
				    <h3>Third slide label</h3>
				    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
				  </Carousel.Caption>
				</Carousel.Item>
		  </Carousel>
		  
		  {/* Why Choose Us Section */}
		  <Container fluid className="mt-3">
		    <Row xs={1} sm={2} lg={4} className="g-3">
				  <Col>
					  {/* wcu = why choose us */}
				    <div className="Home-wcu border border-dark border-1 rounded-pill">
					  	<div className="text-center fs-3">
								<i className="bi bi-truck"></i>
							</div>
							<h5 className="text-center">Fast Delivery</h5>
						</div>
				  </Col>
					<Col>
					  {/* wcu = why choose us */}
					  <div className="Home-wcu border border-dark border-1 rounded-pill">
					  	<div className="text-center fs-3">
								<i className="bi bi-trophy"></i>
							</div>
							<h5 className="text-center">Excellent Quality</h5>
						</div>
					</Col>
					<Col>
					  {/* wcu = why choose us */}
					  <div className="Home-wcu border border-dark border-1 rounded-pill">
					  	<div className="text-center fs-3">
								<i className="bi bi-bag-check"></i>
							</div>
							<h5 className="text-center">Affordable Price</h5>
						</div>
					</Col>
					<Col>
						{/* wcu = why choose us */}
					  <div className="Home-wcu border border-dark border-1 rounded-pill">
					  	<div className="text-center fs-3">
								<i className="bi bi-telephone"></i>
							</div>
							<h5 className="text-center">24/7 Support</h5>
						</div>
					</Col>
				</Row>
		  </Container>
			
			{/* Categories Section */}
			<Container fluid>
				<div
				  className="d-flex justify-content-between align-items-center border-bottom border-1 border-dark mt-5 mb-2 pb-2"
					id="cBorder"
				>
					<h3 className="m-0">Categories</h3>
					<Button variant={"success"}>View All</Button>
				</div>
				<Row md={3}>
					<Col>
						<div>
							<Button
								className="w-100 h-100"
								variant={categoryButton}
							>
								<i className="bi bi-phone"></i> Smartphone
							</Button>
						</div>
					</Col>
					<Col>
						<div>
							<Button
								className="w-100 h-100"
								variant={categoryButton}
							>
								<i className="bi bi-smartwatch"></i> Smartwatch
							</Button>
						</div>
					</Col>
					<Col>
						<div>
							<Button
								className="w-100 h-100"
								variant={categoryButton}
							>
								<i className="bi bi-camera"></i> Video Camera
							</Button>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
  );
};

export default Home;