import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { enableLightTheme, enableDarkTheme } from '../../../features/theme/themeSlice';
import MiniCart from "../miniCart/MiniCart";

const Header = () => {
  const theme = useSelector((state) => state.themeReducer.theme);
	const role = useSelector((state) => state.authReducer.role);
  const dispatch = useDispatch();
  const [themeIcon, setThemeIcon] = useState(<i className="bi bi-moon"></i>);
	const [show, setShow] = useState(false);
  
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  
  const toggleTheme = () => {
	if (theme === "light") {
	  dispatch(enableDarkTheme());
	  setThemeIcon(<i className="bi bi-sun"></i>);
	} else {
	  dispatch(enableLightTheme());
	  setThemeIcon(<i className="bi bi-moon"></i>);
	}
  };
  
  return (
	<div className="w-max">
	  <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
	    <Container fluid>
	      <Navbar.Brand href={null}>Ecommerce</Navbar.Brand>
	      <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
	      <Navbar.Collapse id="responsive-navbar-nav">
	        <Nav className="me-auto">
						<Nav.Link as={Link} to="/">Home</Nav.Link>
						<Nav.Link as={Link} to="/shop">Shop</Nav.Link>
						<Nav.Link as={Link} to="/categories">Categories</Nav.Link>
	        </Nav>
	        <Nav>
						<Nav.Link
							as={Link}
							to={null}
							onClick={toggleTheme}
						>
							{themeIcon}
						</Nav.Link>
						<Nav.Link
							as={Link}
							to={null}
							onClick={handleShow}
						>
							<i className="bi bi-cart4"></i>
						</Nav.Link>
						<NavDropdown title={<i className="bi bi-person-circle"></i>} id="collapsible-nav-dropdown" align="end">
							{role === "" && <NavDropdown.Item as={Link} to="/sign-in">Sign In</NavDropdown.Item>}
							{role === "" && <NavDropdown.Item as={Link} to="/sign-up">Sign Up</NavDropdown.Item>}
							{(role === "user" || role === "admin") && <NavDropdown.Item as={Link} to="/my-profile">My Profile</NavDropdown.Item>}
							{(role === "user" || role === "admin") && <NavDropdown.Item as={Link} to="/my-orders">My Orders</NavDropdown.Item>}
							{role === "admin" && <NavDropdown.Item as={Link} to="/dashboard">Dashboard</NavDropdown.Item>}
							{role !== "" &&<NavDropdown.Item as={Link} to="/sign-out">Sign Out</NavDropdown.Item>}
						</NavDropdown>
	        </Nav>
	      </Navbar.Collapse>
	    </Container>
	  </Navbar>

		{/* Mini Cart Container */}
		<Offcanvas show={show} onHide={handleClose} placement="end" name="end" scroll="true">
			<Offcanvas.Header closeButton>
				<Offcanvas.Title>Mini Cart</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				<MiniCart/>
			</Offcanvas.Body>
		</Offcanvas>
	</div>
  );
};

export default Header;