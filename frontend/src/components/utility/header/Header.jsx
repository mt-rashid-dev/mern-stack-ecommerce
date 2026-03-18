import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { enableLightTheme, enableDarkTheme } from '../../../features/theme/themeSlice';

const Header = () => {
  const theme = useSelector((state) => state.themeReducer.theme);
  const dispatch = useDispatch();
  const [themeIcon, setThemeIcon] = useState(<i className="bi bi-moon"></i>);
  
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
			  <Nav.Link as={Link} to="/about">About</Nav.Link>
			  <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
	        </Nav>
	        <Nav>
			  <Nav.Link
			    as={Link}
				to={null}
				onClick={toggleTheme}
			  >
			    {themeIcon}
			  </Nav.Link>
			  <Nav.Link as={Link} to={null}><i className="bi bi-cart4"></i></Nav.Link>
			  <NavDropdown title={<i className="bi bi-person-circle"></i>} id="collapsible-nav-dropdown" align="end">
			    <NavDropdown.Item as={Link} to="/sign-in">Sign-In</NavDropdown.Item>
			    <NavDropdown.Item as={Link} to="/sign-up">Sign-Up</NavDropdown.Item>
				<NavDropdown.Item as={Link} to="/dashboard">Dashboard</NavDropdown.Item>
				<NavDropdown.Item as={Link} to="/sign-up">Sign-Out</NavDropdown.Item>
			  </NavDropdown>
	        </Nav>
	      </Navbar.Collapse>
	    </Container>
	  </Navbar>
	</div>
  );
};

export default Header;