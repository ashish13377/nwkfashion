import React, {useEffect, useState}from "react";
import { useNavigate  } from "react-router-dom";

const MyAccountRightContents = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
 
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"))
    setUser(data)
    if (!data) {
      navigate("/loginRegisterPage");
    }
  }, []);
  return (
    <div>
      <div className="tab-content" id="myaccountContent">
        {/* Single Tab Content Start */}
        <div
          className="tab-pane fade show active"
          id="dashboad"
          role="tabpanel"
        >
          <div className="myaccount-content">
            <h3>Dashboard</h3>
            <div className="welcome">
              <p>
                Hello, <strong>{user.name}</strong> (If Not{" "}
                <strong>{user.username} !</strong>
                <a href="login-register.html" className="logout">
                  {" "}
                  Logout
                </a>
                )
              </p>
            </div>
            <p className="mb-0">
              From your account dashboard. you can easily check &amp; view your
              recent orders, manage your shipping and billing addresses and edit
              your password and account details.
            </p>
          </div>
        </div>
        {/* Single Tab Content End */}
        {/* Single Tab Content Start */}
        <div className="tab-pane fade" id="orders" role="tabpanel">
          <div className="myaccount-content">
            <h3>Orders</h3>
            <div className="myaccount-table table-responsive text-center">
              <table className="table table-bordered">
                <thead className="thead-light">
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Moisturizing Oil</td>
                    <td>Aug 22, 2022</td>
                    <td>Pending</td>
                    <td>$45</td>
                    <td>
                      <a href="cart.html" className="btn btn-dark btn-round">
                        View
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Katopeno Altuni</td>
                    <td>July 22, 2022</td>
                    <td>Approved</td>
                    <td>$100</td>
                    <td>
                      <a href="cart.html" className="btn btn-dark btn-round">
                        View
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Murikhete Paris</td>
                    <td>June 12, 2022</td>
                    <td>On Hold</td>
                    <td>$99</td>
                    <td>
                      <a href="cart.html" className="btn btn-dark btn-round">
                        View
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Single Tab Content End */}
        {/* Single Tab Content Start */}
        <div className="tab-pane fade" id="download" role="tabpanel">
          <div className="myaccount-content">
            <h3>Downloads</h3>
            <div className="myaccount-table table-responsive text-center">
              <table className="table table-bordered">
                <thead className="thead-light">
                  <tr>
                    <th>Product</th>
                    <th>Date</th>
                    <th>Expire</th>
                    <th>Download</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Moisturizing Oil</td>
                    <td>Aug 22, 2022</td>
                    <td>Yes</td>
                    <td>
                      <a href="#" className="btn btn-dark btn-round">
                        Download File
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Katopeno Altuni</td>
                    <td>Sep 12, 2022</td>
                    <td>Never</td>
                    <td>
                      <a href="#" className="btn btn-dark btn-round">
                        Download File
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Single Tab Content End */}
        {/* Single Tab Content Start */}
        <div className="tab-pane fade" id="payment-method" role="tabpanel">
          <div className="myaccount-content">
            <h3>Payment Method</h3>
            <p className="saved-message">
              You Can't Saved Your Payment Method yet.
            </p>
          </div>
        </div>
        {/* Single Tab Content End */}
        {/* Single Tab Content Start */}
        <div className="tab-pane fade" id="address-edit" role="tabpanel">
          <div className="myaccount-content">
            <h3>Billing Address</h3>
            <address>
              <p>
                <strong>Alex Tuntuni</strong>
              </p>
              <p>
                1355 Market St, Suite 900 <br />
                San Francisco, CA 94103
              </p>
              <p>Mobile: (123) 456-7890</p>
            </address>
            <a href="#" className="btn btn-dark btn-round d-inline-block">
              <i className="fa fa-edit" />
              Edit Address
            </a>
          </div>
        </div>
        {/* Single Tab Content End */}
        {/* Single Tab Content Start */}
        <div className="tab-pane fade" id="account-info" role="tabpanel">
          <div className="myaccount-content">
            <h3>Account Details</h3>
            <div className="account-details-form">
              <form action="#">
                <div className="row">
                  <div className="col-lg-6 col-12 mb-30">
                    <input
                      id="first-name"
                      placeholder="First Name"
                      type="text"
                    />
                  </div>
                  <div className="col-lg-6 col-12 mb-30">
                    <input id="last-name" placeholder="Last Name" type="text" />
                  </div>
                  <div className="col-12 mb-30">
                    <input
                      id="display-name"
                      placeholder="Display Name"
                      type="text"
                    />
                  </div>
                  <div className="col-12 mb-30">
                    <input
                      id="email"
                      placeholder="Email Address"
                      type="email"
                    />
                  </div>
                  <div className="col-12 mb-30">
                    <h4>Password change</h4>
                  </div>
                  <div className="col-12 mb-30">
                    <input
                      id="current-pwd"
                      placeholder="Current Password"
                      type="password"
                    />
                  </div>
                  <div className="col-lg-6 col-12 mb-30">
                    <input
                      id="new-pwd"
                      placeholder="New Password"
                      type="password"
                    />
                  </div>
                  <div className="col-lg-6 col-12 mb-30">
                    <input
                      id="confirm-pwd"
                      placeholder="Confirm Password"
                      type="password"
                    />
                  </div>
                  <div className="col-12">
                    <button className="btn btn-dark btn-round btn-lg">
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Single Tab Content End */}
      </div>
    </div>
  );
};

export default MyAccountRightContents;
