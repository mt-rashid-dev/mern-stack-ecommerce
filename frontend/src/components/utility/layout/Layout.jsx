import Footer from "../footer/Footer.jsx";
import Header from "../header/Header.jsx";

const Layout = ({ children }) => {
  return (
	<div>
	  <Header/>
	  {children}
		<Footer/>
	</div>
  );
};

export default Layout;