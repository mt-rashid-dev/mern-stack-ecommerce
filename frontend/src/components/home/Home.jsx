import "./Home.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import carouselImg1 from "../../assets/carousel-img-1.jpg";
import carouselImg2 from "../../assets/carousel-img-2.jpg";
import carouselImg3 from "../../assets/carousel-img-3.jpg";

const Home = () => {
	const theme = useSelector((state) => state.themeReducer.theme);
  const [index, setIndex] = useState(0);
	
	useEffect(() => {
		// wcu = why choose us
		const wcu = document.getElementsByClassName("Home-wcu");
		
		// Change border color of wcu for dark theme
		if (theme === "dark") {
			for (let i = 0; i < wcu.length; i++) {
				wcu[i].classList.remove("border-dark");
				wcu[i].classList.add("border-light");
			}
		}
		
		if (theme === "light") {
			for (let i = 0; i < wcu.length; i++) {
				wcu[i].classList.remove("border-light");
				wcu[i].classList.add("border-dark");
			}
		}
	}, [theme]);

  const handleSelect = (selectedIndex) => {
	setIndex(selectedIndex);
  };

  return (
	<div className="w-max">
	  {/* Carousel Container */}
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
	</div>
  );
};

export default Home;