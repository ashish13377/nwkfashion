import React, { useState } from "react";

const LoginRegisterForm = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerName, setRegisterName] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // Basic validation for login
    if (!loginEmail || !loginPassword) {
      alert("Please enter both email and password");
      return;
    }

    // Create a data object to send to the server
    const loginData = {
      email: loginEmail,
      password: loginPassword,
    };

    // Send the loginData to the server
    fetch("/loginEndpoint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log("Login response:", data);

        // Reset the form
        setLoginEmail("");
        setLoginPassword("");
      })
      .catch((error) => {
        console.log("Error occurred:", error);
      });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    // Basic validation for registration
    if (
      !registerName ||
      !registerUsername ||
      !registerEmail ||
      !registerPassword ||
      !confirmPassword
    ) {
      alert("Please fill in all fields");
      return;
    }

    if (registerPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Create a data object to send to the server
    const registerData = {
      name: registerName,
      username: registerUsername,
      email: registerEmail,
      password: registerPassword,
    };

    // Send the registerData to the server
    fetch("/registerEndpoint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log("Registration response:", data);

        // Reset the form
        setRegisterName("");
        setRegisterUsername("");
        setRegisterEmail("");
        setRegisterPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        console.log("Error occurred:", error);
      });
  };

  return (
    <div>
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
