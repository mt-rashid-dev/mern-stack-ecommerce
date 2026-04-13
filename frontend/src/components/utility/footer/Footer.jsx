import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<div className="w-max bg-dark text-light mt-5">
			<Container className="p-4 text-nowrap">
				<Row xs={1} lg={3} className="g-5">
					<Col>
						<div>
							<h5><i className="bi bi-telephone"></i> aaa-aaaaaa</h5>
							<h5><i className="bi bi-envelope"></i> lorem.ipsum@example.com</h5>
							<h5><i className="bi bi-geo-alt"></i> House 1, Street 1, City A</h5>

							<h3 className="mt-4">Follow Us</h3>
							<i className="bi bi-facebook fs-3 me-2"></i><i className="bi bi-twitter fs-3 me-2"></i><i className="bi bi-instagram fs-3 me-2"></i><i className="bi bi-pinterest fs-3 me-2"></i><i className="bi bi-discord fs-3 me-2"></i>
						</div>
					</Col>
					<Col className="text-lg-end">
						<div>
							<h3>Quick Links</h3>
							<h5>
								<Link className="text-decoration-none text-light">Home</Link>
							</h5>
							<h5>
								<Link className="text-decoration-none text-light">Shop</Link>
							</h5>
							<h5>
								<Link className="text-decoration-none text-light">Categories</Link>
							</h5>
							<h5>
								<Link className="text-decoration-none text-light">Privacy Policy</Link>
							</h5>
							<h5>
								<Link className="text-decoration-none text-light">Terms & Conditions</Link>
							</h5>
						</div>
					</Col>
					<Col className="text-lg-end">
						<div>
							<h3>Discover</h3>
							<h5>
								<Link className="text-decoration-none text-light">Smartphone</Link>
							</h5>
							<h5>
								<Link className="text-decoration-none text-light">Wristwatch</Link>
							</h5>
							<h5>
								<Link className="text-decoration-none text-light">Video Camera</Link>
							</h5>
							<h5>
								<Link className="text-decoration-none text-light">Webcam</Link>
							</h5>
							<h5>
								<Link className="text-decoration-none text-light">More</Link>
							</h5>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Footer;