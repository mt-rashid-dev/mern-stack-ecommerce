import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "./components/utility/layout/Layout";
import Home from "./components/home/Home";

const App = () => {
  const theme = useSelector((state) => state.themeReducer.theme);
  
  useEffect(() => {
	const mainTheme = document.getElementById("mainTheme");
	
	if (theme === "light") {
	  mainTheme.setAttribute("data-bs-theme", "light");
	} else {
	  mainTheme.setAttribute("data-bs-theme", "dark");
	}
  }, [theme]);

  return (
    <div>
	  <BrowserRouter>
	    <Routes>
			  <Route path="/" element={<Layout>
					<Home/>
			  </Layout>}/>
			  <Route path="/shop" element={<Layout><div>Shop</div></Layout>}/>
			  <Route path="/cart" element={<Layout><div>Cart</div></Layout>}/>
			  <Route path="/categories" element={<Layout><div>Categories</div></Layout>}/>
			  <Route path="/dashboard" element={<Layout><div>Dashboard</div></Layout>}/>
			  <Route path="/sign-in" element={<Layout><div>Sign-In</div></Layout>}/>
			  <Route path="/sign-up" element={<Layout><div>Sign-Up</div></Layout>}/>
			  <Route path="/sign-out" element={<Layout><div>Sign-Out</div></Layout>}/>
				<Route path="*" element={<Layout>
					<p>404 Error! Sorry, the page you are looking for was not found.</p>
				</Layout>}/>
			</Routes>
	  </BrowserRouter>
	</div>
  );
};

export default App
