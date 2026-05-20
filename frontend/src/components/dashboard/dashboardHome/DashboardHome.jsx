import "./DashboardHome.css";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector  } from "react-redux";

import { enableDarkTheme, enableLightTheme } from "../../../features/theme/themeSlice";

const DashboardHome = () => {
  const role = useSelector(state => state.authReducer.role);
  const theme = useSelector(state => state.themeReducer.theme);
  const dispatch = useDispatch();
  const [themeIcon, setThemeIcon] = useState(<i className="bi bi-moon"></i>);
  const navigate = useNavigate();
  let showSidebar = true;

  useEffect(() => {
    if (role === "admin") {
      toggleStyle();
    } else {
      navigate("/");
    }
  }, [theme]);

  const toggleTheme = () => {
		if (theme === "light") {
			dispatch(enableDarkTheme());
			setThemeIcon(<i className="bi bi-sun"></i>);
		} else {
			dispatch(enableLightTheme());
			setThemeIcon(<i className="bi bi-moon"></i>);
		}
  };

  const toggleStyle = () => {
    const headerButtons = document.getElementsByClassName("header-button");
    const dashboardSidebar = document.getElementById("dashboardSidebar");
    const dashboardHeader = document.getElementById("dashboardHeader");
    const dashboardLinks = document.getElementsByClassName("Dashboard-link");

    if (theme === "dark") {
      for(let i = 0; i < headerButtons.length; i++) {
        headerButtons[i].classList.remove("btn-light-2");
        headerButtons[i].classList.add("btn-dark-2");
      }
      for(let i = 0; i < dashboardLinks.length; i++) {
        dashboardLinks[i].classList.remove("btn-light-2");
        dashboardLinks[i].classList.add("btn-dark-2");
      }
      dashboardSidebar.classList.remove("bg-color-CornSilk");
      dashboardSidebar.classList.add("bg-color-DarkCharcoal");
      dashboardHeader.classList.remove("bg-color-CornSilk");
      dashboardHeader.classList.add("bg-color-DarkCharcoal");
    }

    if (theme === "light") {
      for (let i = 0; i < headerButtons.length; i++) {
        headerButtons[i].classList.remove("btn-dark-2");
        headerButtons[i].classList.add("btn-light-2");
      }
      for(let i = 0; i < dashboardLinks.length; i++) {
        dashboardLinks[i].classList.remove("btn-dark-2");
        dashboardLinks[i].classList.add("btn-light-2");
      }
      dashboardSidebar.classList.remove("bg-color-DarkCharcoal");
      dashboardSidebar.classList.add("bg-color-CornSilk");
      dashboardHeader.classList.remove("bg-color-DarkCharcoal");
      dashboardHeader.classList.add("bg-color-CornSilk");
    }
  };

  const toggleSidebar = () => {
    const sidebar = document.getElementById("dashboardSidebar");
    const main = document.getElementById("dashboardMain");

    if (showSidebar) {
      sidebar.classList.remove("Dashboard-sidebar-show");
      sidebar.classList.add("Dashboard-sidebar-hide");
      main.classList.remove("Dashboard-main-default");
      main.classList.add("Dashboard-main-expand");
      showSidebar = false;
    } else {
      sidebar.classList.remove("Dashboard-sidebar-hide");
      sidebar.classList.add("Dashboard-sidebar-show");
      main.classList.remove("Dashboard-main-expand");
      main.classList.add("Dashboard-main-default");
      showSidebar = true;
    }
  };

  return (
    <div className="Dashboard-home">
      {role === "admin" && <div className="Dashboard-sidebar Dashboard-sidebar-show bg-color-CornSilk" id="dashboardSidebar">
        {/* sh = sidebar header */}
        <div className="Dashboard-sh">
          <h5 className="m-0 fw-bold">Dashboard</h5>
        </div>
        <div className="Dashboard-menu">
          <Link to="/dashboard" className="Dashboard-link btn-light-2">Overview</Link>
        </div>
        <div className="Dashboard-menu">
          <Link to="/dashboard/pending-orders" className="Dashboard-link btn-light-2">Pending Orders</Link>
        </div>
        <div className="Dashboard-menu">
          <Link to="/dashboard/delivered-orders" className="Dashboard-link btn-light-2">Delivered Orders</Link>
        </div>
        <div className="Dashboard-menu">
          <Link to="/dashboard/products" className="Dashboard-link btn-light-2">Products</Link>
        </div>
        <div className="Dashboard-menu">
          <Link to="/dashboard/new-product" className="Dashboard-link btn-light-2">New Product</Link>
        </div>
        <div className="Dashboard-menu">
          <Link to="/dashboard/update-product" className="Dashboard-link btn-light-2">Update Product</Link>
        </div>
        <div className="Dashboard-menu">
          <Link to="/dashboard/delete-product" className="Dashboard-link btn-light-2">Delete Product</Link>
        </div>
        <div className="Dashboard-menu">
          <Link to="/dashboard/users" className="Dashboard-link btn-light-2">Users</Link>
        </div>
      </div>}
      {role === "admin" && <div className="Dashboard-main Dashboard-main-default" id="dashboardMain">
        <div className="Dashboard-header bg-color-CornSilk" id="dashboardHeader">
          <div> 
            <span
              className="header-button btn-light-2 px-2 py-1 rounded-2"
              onClick={toggleSidebar}
            >
              <i className="bi bi-list"></i>
            </span>
          </div>
          <div>
            <span
              className="header-button btn-light-2 px-2 py-1 rounded-2"
              onClick={toggleTheme}
            >
              {themeIcon}
            </span>&nbsp;&nbsp;
            <span
              className="header-button btn-light-2 px-2 py-1 rounded-2"
              onClick={() => navigate("/")}
            >
              <i className="bi bi-house-door"></i>
            </span>&nbsp;&nbsp;
            <span
              className="header-button btn-light-2 px-2 py-1 rounded-2"
            >
              Sign Out
            </span>
          </div>
        </div>
        <div className="Dashboard-content">
          <Outlet/>
        </div>
      </div>}
    </div>
  );
};

export default DashboardHome;