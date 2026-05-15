import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import {
	storeProfilePicture,
	storeFirstName,
	storeLastName,
	storeEmail,
	storeRole
} from "./features/auth/authSlice";
import Layout from "./components/utility/layout/Layout";
import Home from "./components/home/Home";
import Shop from "./components/shop/Shop";
import Cart from "./components/cart/Cart";
import MyProfile from "./components/myProfile/MyProfile";
import Signin from "./components/signin/Signin";
import Signup from "./components/signup/Signup";
import Signout from "./components/signout/Signout";
import VerifyOrder from "./components/verifyOrder/VerifyOrder";
import MyOrders from "./components/myOrders/MyOrders";

const App = () => {
  const theme = useSelector((state) => state.themeReducer.theme);
	const dispatch = useDispatch();
  
  useEffect(() => {
		const mainTheme = document.getElementById("mainTheme");
		
		if (theme === "light") {
			mainTheme.setAttribute("data-bs-theme", "light");
		} else {
			mainTheme.setAttribute("data-bs-theme", "dark");
		}

		axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/current-user`, {}, { withCredentials: true })
		.then(res => {
      dispatch(storeProfilePicture(res.data.prifilePicture));
      dispatch(storeFirstName(res.data.firstName));
      dispatch(storeLastName(res.data.lastName));
      dispatch(storeEmail(res.data.email));
      dispatch(storeRole(res.data.role));
		})
		.catch(error => console.log(error));
  }, [theme]);

  return (
    <div>
	  <BrowserRouter>
	    <Routes>
			  <Route path="/" element={<Layout>
					<Home/>
			  </Layout>}/>
			  <Route path="/shop" element={<Layout>
					<Shop/>
				</Layout>}/>
			  <Route path="/cart" element={<Layout>
					<Cart/>
				</Layout>}/>
			  <Route path="/categories" element={<Layout><div>Categories</div></Layout>}/>
				<Route path="/my-profile" element={<Layout>
					<MyProfile/>
				</Layout>}/>
				<Route path="/my-orders" element={<Layout>
					<MyOrders/>
				</Layout>}/>
			  <Route path="/dashboard" element={<Layout><div>Dashboard</div></Layout>}/>
			  <Route path="/sign-in" element={<Layout>
					<Signin/>
				</Layout>}/>
			  <Route path="/sign-up" element={<Layout>
					<Signup/>
				</Layout>}/>
			  <Route path="/sign-out" element={<Layout>
					<Signout/>
				</Layout>}/>
				<Route path="/verify-order" element={<Layout>
					<VerifyOrder/>
				</Layout>}/>
				<Route path="*" element={<Layout>
					<p>404 Error! Sorry, the page you are looking for was not found.</p>
				</Layout>}/>
			</Routes>
	  </BrowserRouter>
	</div>
  );
};

export default App
