import "./Home.css";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import carouselImg1 from "../../assets/carousel-img-1.jpg";
import carouselImg2 from "../../assets/carousel-img-2.jpg";
import carouselImg3 from "../../assets/carousel-img-3.jpg";

const Home = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
	setIndex(selectedIndex);
  };

  return (
	<div className="w-max">
	  {/* Carousel Container */}
	  <Carousel activeIndex={index} onSelect={handleSelect}>
	    <Carousel.Item>
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
	</div>
  );
};

export default Home;