import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { serverAPILocal } from "../App";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserId } from "../utils/cartSlice";
const LoginRegisterForm = () => {
  const navigate = useNavigate();
  // login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  //registerName
  const [registerName, setRegisterName] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      username: loginEmail,
      password: loginPassword,
    };

    if (loginEmail === "") {
      toast.warning("Email is required!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } else if (loginPassword === "") {
      toast.warning("password is required!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } else {
      try {
        const loginres = await axios.post(
          `${serverAPILocal}/users/login`,
          loginData,
          {
            withCredentials: true,
          }
        );
        localStorage.setItem("jwt", JSON.stringify(loginres.data.token));
        localStorage.setItem("user", JSON.stringify(loginres.data.userLogin));
        // console.log(loginres.data.message)
        if (loginres.status === 200) {
          const mess = loginres.data.message;
          toast.success(mess, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
          dispatch(setUserId(loginres.data.userLogin._id));
          console.log("userId", loginres.data.userLogin._id);
          setTimeout(() => {
            navigate("/myAccountPage");
          }, 2500);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    // Create a data object to send to the server
    const registerData = {
      name: registerName,
      username: registerUsername,
      email: registerEmail,
      password: registerPassword,
      cfpassword: confirmPassword,
    };

    if (registerName === "") {
      toast.warning("Register Name is required!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } else if (registerUsername === "") {
      toast.warning("Username is required!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } else if (registerEmail === "") {
      toast.warning("Email is required!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } else if (registerPassword === "") {
      toast.warning("Password is required!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } else if (registerPassword != confirmPassword) {
      toast.warning("Password are not matching! 😒", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } else {
      try {
        const loginres = await axios.post(
          `${serverAPILocal}/users/register`,
          registerData,
          {
            withCredentials: true,
          }
        );
        console.log(loginres);
        if (loginres.status === 200) {
          const mess = loginres.data.message;
          toast.success(mess, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
        }
      } catch (error) {
        toast.error(error.response.data.error, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }
    }
  };

  return (
    <div>
      <div>
        <ToastContainer />
      </div>
      <div className="page-section section section-padding">
        <div className="container">
          <div className="row mbn-40">
            <div className="col-lg-4 col-12 mb-40">
              <div className="login-register-form-wrap">
                <h3>Login</h3>
                <form onSubmit={handleLoginSubmit} className="mb-30">
                  <div className="row">
                    <div className="col-12 mb-15">
                      <input
                        type="text"
                        placeholder="Username or Email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                      />
                    </div>
                    <div className="col-12 mb-15">
                      <input
                        type="password"
                        placeholder="Password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                    </div>
                    <div className="col-12">
                      <input type="submit" value="Login" />
                    </div>
                  </div>
                </form>
                <h4>You can also login with...</h4>
                <div className="social-login">
                  <a href="#">
                    <i className="fa fa-facebook" />
                  </a>
                  <a href="#">
                    <i className="fa fa-twitter" />
                  </a>
                  <a href="#">
                    <i className="fa fa-google-plus" />
                  </a>
                  <a href="#">
                    <i className="fa fa-pinterest" />
                  </a>
                  <a href="#">
                    <i className="fa fa-linkedin" />
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-2 col-12 mb-40 text-center d-none d-lg-block">
              <span className="login-register-separator" />
            </div>

            <div className="col-lg-6 col-12 mb-40 ms-auto">
              <div className="login-register-form-wrap">
                <h3>Register</h3>
                <form onSubmit={handleRegisterSubmit}>
                  <div className="row">
                    <div className="col-md-6 col-12 mb-15">
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 col-12 mb-15">
                      <input
                        type="text"
                        placeholder="User Name"
                        value={registerUsername}
                        onChange={(e) => setRegisterUsername(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 col-12 mb-15">
                      <input
                        type="email"
                        placeholder="Email"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 col-12 mb-15">
                      <input
                        type="password"
                        placeholder="Password"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 col-12 mb-15">
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 col-12">
                      <input type="submit" value="Register" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterForm;
