import React, { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { serverAPI } from "../../index";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../../components/Component";
import { Form, Spinner, Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  // const history = useHistory();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const api = serverAPI;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make a POST request to the login API endpoint
      const response = await axios.post(`${api}admin/login`,formData,{
        withCredentials: true
      });

      if (response.status === 200) {
        // Store the JWT token in local storage
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
       
      } else {

      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      // Handle login error

    }

    setLoading(true);
    setTimeout(() => {
      navigate("/admin");
      setLoading(false);
    }, 1500);
  };

  

  
  return <>
    <Head title="Login" />
    <Block className="nk-block-middle nk-auth-body  wide-xs">
      <div className="brand-logo pb-4 text-center">
        <Link to={"/"} className="logo-link">
          <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
          <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
        </Link>
      </div>

      <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
        <BlockHead>
          <BlockContent>
            <BlockTitle tag="h4">Sign-In</BlockTitle>
            <BlockDes>
              <p>Access SalonEase using your email and passcode.</p>
            </BlockDes>
          </BlockContent>
        </BlockHead>

        <Form className="is-alter" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="form-label-group">
              <label className="form-label" htmlFor="default-01">
                Email
              </label>
            </div>
            <div className="form-control-wrap">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                id="default-01"
                defaultValue="info@softnio.com"
                placeholder="Enter your email address"
                className="form-control-lg form-control" />

            </div>
          </div>
          <div className="form-group">
            <div className="form-label-group">
              <label className="form-label" htmlFor="password">
                Passcode
              </label>
              <Link className="link link-primary link-sm" to={`/auth-reset`}>
                Forgot Code?
              </Link>
            </div>
            <div className="form-control-wrap">
              <a
                href="#password"
                onClick={(ev) => {
                  ev.preventDefault();
                  setPassState(!passState);
                }}
                className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
              >
                <Icon name="eye" className="passcode-icon icon-show"></Icon>

                <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
              </a>
              <input
                type={passState ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your passcode"
                className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`} />
            </div>
          </div>
          <div className="form-group">
            <Button size="lg" className="btn-block" type="submit" color="primary">
              {loading ? <Spinner size="sm" color="light" /> : "Sign in"}
            </Button>
          </div>
        </Form>


      </PreviewCard>
    </Block>
    <AuthFooter />
    <ToastContainer />
  </>;
};
export default Login;
