import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import { Row, Col } from "reactstrap";
import Dropzone from "react-dropzone";
import { Image, Transformation } from "cloudinary-react";
import axios from "axios";
import { serverAPI } from "../..";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  BackTo,
  PreviewCard,
  Button,
} from "../../components/Component";
import { Spinner } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Register = () => {
  const [passState, setPassState] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    whatsappNumber: "",
    dateofbirth: "",
    countryofResidence: "",
    permanentAddress: "",
    pinCode: "",
    city: "",
    verification: "",
  });

  const [checked, setChecked] = useState();
  function handleChangeChecked(e) {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    setFormData((prevFormData) => ({
      ...prevFormData,
      termsandcondition: isChecked,
    }));
  }

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const [frontSide, setFrontSide] = useState(null);
  const [backSide, setBackSide] = useState(null);
  const [passportPicture, setPassportPicture] = useState(null);

  const [preview, setPreview] = useState(null);

  const uploadToCloudinary = async (file, resourceType) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ypfu9qmr");
    formData.append("resource_type", resourceType);

    const response = await axios.post("https://api.cloudinary.com/v1_1/dy4hpcssz/auto/upload", formData);

    return response.data.secure_url;
  };

  const handleDropChange = async (acceptedFiles, fileFieldName) => {
    const file = acceptedFiles[0];
    if (fileFieldName === "frontSide") {
      setFrontSide(file);
      const frontSideUrl = await uploadToCloudinary(file, "image");
      if (frontSideUrl) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          aadharCardFont: frontSideUrl,
        }));
        console.log("Front Side URL:", frontSideUrl);
      }
    } else if (fileFieldName === "backSide") {
      setBackSide(file);
      const backSideUrl = await uploadToCloudinary(file, "image");
      if (backSideUrl) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          aadharCardBack: backSideUrl,
        }));
        console.log("Back Side URL:", backSideUrl);
      }
    } else if (fileFieldName === "passportPicture") {
      setPassportPicture(file);
      const passportPictureUrl = await uploadToCloudinary(file, "image");
      if (passportPictureUrl) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          profilePicture: passportPictureUrl,
        }));
        console.log("Passport Picture URL:", passportPictureUrl);
      }
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const response = await axios.post(`${serverAPI}admin/register`, {
        ...formData,
      });
      if (response.status === 201) {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });

        setTimeout(() => {
          setLoading(false);
          setFrontSide(null);
          setBackSide(null);
          setPassportPicture(null);
        }, 1990);
      }

      console.log("API Response:", response.data);
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
      setTimeout(() => {
        setLoading(false);
      }, 1990);
    }
  };

  // const navigate = useNavigate();
  // const handleFormSubmit = () => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     navigate(`/admin/auth-success`);
  //   }, 1000);
  // };
  return (
    <>
      <Head title="Register" />
      <Block className="nk-block-middle nk-auth-body  wide-sm">
        <div className="brand-logo pb-4 text-center">
          <Link to={`/admin/`} className="logo-link">
            <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
            <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
          </Link>
        </div>
        <BlockHead>
          <BlockHeadContent className="brand-logo text-center">
            <BlockTitle tag="h5">Basic Form Style S-2</BlockTitle>
            <p>You can alow display form in column as example below.</p>
          </BlockHeadContent>
        </BlockHead>
        <PreviewCard>
          <form>
            <Row className="g-4">
              <Col lg="6">
                <div className="form-group">
                  <label className="form-label" htmlFor="full-name-1">
                    First Name
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="full-name-1"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <div className="form-group">
                  <label className="form-label" htmlFor="email-address-1">
                    Last Name
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="email-address-1"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <div className="form-group">
                  <label className="form-label" htmlFor="phone-no-1">
                    Phone Number
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="number"
                      id="phone-no-1"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <div className="form-group">
                  <label className="form-label" htmlFor="pay-amount-1">
                    WhatsApp Number
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="number"
                      id="pay-amount-1"
                      name="whatsappNumber"
                      value={formData.whatsappNumber}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <div className="form-group">
                  <label className="form-label" htmlFor="phone-no-1">
                    Email address
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="email"
                      id="phone-no-1"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <div className="form-group">
                  <label className="form-label" htmlFor="pay-amount-1">
                    Date of Birth
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="date"
                      id="pay-amount-1"
                      name="dateofbirth"
                      value={formData.dateofbirth}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <div className="form-group">
                  <label className="form-label" htmlFor="phone-no-1">
                    Country of Residence
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="phone-no-1"
                      name="countryofResidence"
                      value={formData.countryofResidence}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <div className="form-group">
                  <label className="form-label" htmlFor="pay-amount-1">
                    Permanent Address
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="pay-amount-1"
                      name="permanentAddress"
                      value={formData.permanentAddress}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <div className="form-group">
                  <label className="form-label" htmlFor="phone-no-1">
                    Pincode
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="number"
                      id="phone-no-1"
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <div className="form-group">
                  <label className="form-label" htmlFor="pay-amount-1">
                    City
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="pay-amount-1"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
              </Col>
              <Col lg="6">
                {/* Front Side Dropzone */}
                <div className="form-group">
                  <label className="form-label">Aadhar card </label>
                  <Dropzone onDrop={(acceptedFiles) => handleDropChange(acceptedFiles, "frontSide")}>
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div {...getRootProps()} className="dropzone upload-zone dz-clickable">
                          <input {...getInputProps()} />
                          {frontSide ? (
                            <div className="dz-preview dz-processing dz-image-preview dz-error dz-complete">
                              <div className="dz-image">
                                <img src={URL.createObjectURL(frontSide)} alt="FrontSide" />
                              </div>
                            </div>
                          ) : (
                            <div className="dz-message">
                              <span className="dz-message-text">Drag and drop Front Side (Image)</span>
                              <span className="dz-message-or">or</span>
                              <a
                                style={{
                                  padding: "7px 18px",
                                  background: "#fc3e84",
                                  color: "#ffff",
                                  fontFamily: "DM Sans, sans-serif",
                                  fontWeight: "700",
                                  fontSize: "0.8125rem",
                                  borderRadius: "6px",
                                }}
                                color="primary"
                              >
                                SELECT
                              </a>
                            </div>
                          )}
                        </div>
                      </section>
                    )}
                  </Dropzone>
                </div>
              </Col>

              <Col lg="6">
                {/* Back Side Dropzone */}
                <div className="form-group">
                  <label className="form-label" style={{ color: "#ffff" }}>
                    .{" "}
                  </label>

                  <Dropzone onDrop={(acceptedFiles) => handleDropChange(acceptedFiles, "backSide")}>
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div {...getRootProps()} className="dropzone upload-zone dz-clickable">
                          <input {...getInputProps()} />
                          {backSide ? (
                            <div className="dz-preview dz-processing dz-image-preview dz-error dz-complete">
                              <div className="dz-image">
                                <img src={URL.createObjectURL(backSide)} alt="BackSide" />
                              </div>
                            </div>
                          ) : (
                            <div className="dz-message">
                              <span className="dz-message-text">Drag and drop Back Side (Image)</span>
                              <span className="dz-message-or">or</span>
                              <a
                                style={{
                                  padding: "7px 18px",
                                  background: "#fc3e84",
                                  color: "#ffff",
                                  fontFamily: "DM Sans, sans-serif",
                                  fontWeight: "700",
                                  fontSize: "0.8125rem",
                                  borderRadius: "6px",
                                }}
                                color="primary"
                              >
                                SELECT
                              </a>
                            </div>
                          )}
                        </div>
                      </section>
                    )}
                  </Dropzone>
                </div>
              </Col>

              <Col lg="6">
                {/* Passport Picture Dropzone */}
                <div className="form-group">
                  <label className="form-label">Profile Picture</label>
                  <Dropzone onDrop={(acceptedFiles) => handleDropChange(acceptedFiles, "passportPicture")}>
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div {...getRootProps()} className="dropzone upload-zone dz-clickable">
                          <input {...getInputProps()} />
                          {passportPicture ? (
                            <div className="dz-preview dz-processing dz-image-preview dz-error dz-complete">
                              <div className="dz-image">
                                <img src={URL.createObjectURL(passportPicture)} alt="PassportPicture" />
                              </div>
                            </div>
                          ) : (
                            <div className="dz-message">
                              <span className="dz-message-text">Drag and drop Passport Picture (Image)</span>
                              <span className="dz-message-or">or</span>
                              <a
                                style={{
                                  padding: "7px 18px",
                                  background: "#fc3e84",
                                  color: "#ffff",
                                  fontFamily: "DM Sans, sans-serif",
                                  fontWeight: "700",
                                  fontSize: "0.8125rem",
                                  borderRadius: "6px",
                                }}
                                color="primary"
                              >
                                SELECT
                              </a>
                            </div>
                          )}
                        </div>
                      </section>
                    )}
                  </Dropzone>
                </div>
              </Col>

              <Col lg="6"></Col>

              <Col lg="6">
                <div className="form-group">
                  <label className="form-label">Terms and Conditions</label>
                  <ul className="custom-control-group g-3 align-center">
                    <li>
                      <div className="custom-control custom-control-sm custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="com-email-1"
                          name="termsandcondition"
                          onChange={handleChangeChecked}
                        />
                        <label className="custom-control-label" htmlFor="com-email-1">
                          I agree to the SalonEase terms and conditions
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
              </Col>

              <Col xl="12">
                <a
                  style={{
                    padding: "11px 24px",
                    background: "#fc3e84",
                    color: "#ffff",
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: "700",
                    fontSize: "0.8125rem",
                    borderRadius: "6px",
                    fontSize: "15px",
                    cursor: "pointer",
                  }}
                  color="primary"
                  size="lg"
                  onClick={handleFileUpload}
                >
                  {loading ? <Spinner size="sm" color="light" /> : "Save Information"}
                </a>
              </Col>
            </Row>
          </form>
        </PreviewCard>
      </Block>
      <AuthFooter />
      <ToastContainer />
    </>
  );
};
export default Register;
