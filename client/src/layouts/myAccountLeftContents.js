import React, {useEffect, useState}from "react";
import { useNavigate  } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { serverAPILocal } from "../App";

const MyAccountLeftContents = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const logout = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.get(`${serverAPILocal}/users/logout`, {
				withCredentials: true,
			});
			if (res.status === 200) {
				localStorage.removeItem("jwt");
				localStorage.removeItem("user");
				toast.success(res.data.message, {
					position: "top-center",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					theme: "light",
				});
				setTimeout(() => {
					navigate("/");
				}, 2500);
			}
		} catch (err) {
			toast.error(err.response.data.message, {
				position: "top-center",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				theme: "light",
			});
		};
	}


  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"))
    setUser(data)
    if (!data) {
      navigate("/loginRegisterPage");
    }
  }, []);
  return (
    <div>
      <div className="myaccount-tab-menu nav" role="tablist">
        <a href="#dashboad" className="active" data-bs-toggle="tab">
          <i className="fa fa-dashboard" />
          Dashboard
        </a>
        <a href="#orders" data-bs-toggle="tab">
          <i className="fa fa-cart-arrow-down" /> Orders
        </a>
        <a href="#download" data-bs-toggle="tab">
          <i className="fa fa-cloud-download" /> Download
        </a>
        <a href="#payment-method" data-bs-toggle="tab">
          <i className="fa fa-credit-card" /> Payment Method
        </a>
        <a href="#address-edit" data-bs-toggle="tab">
          <i className="fa fa-map-marker" /> address
        </a>
        <a href="#account-info" data-bs-toggle="tab">
          <i className="fa fa-user" /> Account Details
        </a>
        <a href="login-register.html" onClick={logout}>
          <i className="fa fa-sign-out" /> Logout
        </a>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MyAccountLeftContents;
