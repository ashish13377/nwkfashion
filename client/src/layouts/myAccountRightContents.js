import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverAPILocal } from "../App";
import { useDispatch } from "react-redux";
import { setUserId } from "../utils/cartSlice";
import axios from "axios";
const MyAccountRightContents = () => {
  const [user, setUser] = useState({});
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    setUser(data);
    if (!data) {
      navigate("/loginRegisterPage");
    }
    console.log(data);
  }, []);

  const clearAuthState = () => {
    localStorage.removeItem("user");
    dispatch(setUserId(null));
    // Add any other logic to clear authentication state here
  };

  const handleLogout = () => {
    // Clear user's authentication state (example: clearing tokens and user info)
    // You can replace the following line with the appropriate method for your app
    clearAuthState();

    navigate("/loginRegisterPage");
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (user._id) {
          const response = await axios.get(
            `${serverAPILocal}/users/${user._id}/orders`
          );
          setOrders(response.data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [user]);
  console.log(orders);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Include the password values in your API call or data submission logic
    const formData = {
      name: user.name,
      email: user.email,
      currentPassword: currentPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };

    // Perform your API call or data submission here
    // Example: axios.post("/api/updateAccount", formData)
  };

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
                <button className="logout" onClick={handleLogout}>
                  Logout
                </button>
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
                  </tr>
                </thead>
                <tbody>
                  {orders.length < 0 ? (
                    <>
                      {" "}
                      {orders.map((order, index) => (
                        <tr key={order?.orderId}>
                          <td>{index + 1}</td>
                          <td>
                            {" "}
                            {order?.productDetails.map((product) => (
                              <div key={product.productId}>{product.name}</div>
                            ))}
                          </td>
                          <td>{order?.orderDate}</td>
                          <td>{order?.orderStatus}</td>
                          <td>
                            {" "}
                            {order?.productDetails.map((product) => (
                              <div key={product.productId}>{product.price}</div>
                            ))}
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <>No order found</>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Single Tab Content End */}
        {/* Single Tab Content Start */}

        {/* Single Tab Content End */}
        {/* Single Tab Content Start */}

        {/* Single Tab Content End */}
        {/* Single Tab Content Start */}
        <div className="tab-pane fade" id="address-edit" role="tabpanel">
          <div className="myaccount-content">
            <h3>Address</h3>
            <address>
              <p>
                <strong>{orders?.address?.address?.firstName}</strong>
              </p>
              <p>{orders?.address}</p>
              <p>{orders?.address?.phoneNo}</p>
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
                  <div className="col-12 mb-30">
                    <input
                      id="display-name"
                      placeholder="Display Name"
                      type="text"
                      value={user.name}
                      readOnly
                    />
                  </div>
                  <div className="col-12 mb-30">
                    <input
                      id="email"
                      placeholder="Email Address"
                      type="email"
                      value={user.email}
                      readOnly
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
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-6 col-12 mb-30">
                    <input
                      id="new-pwd"
                      placeholder="New Password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-6 col-12 mb-30">
                    <input
                      id="confirm-pwd"
                      placeholder="Confirm Password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-dark btn-round btn-lg"
                      type="submit"
                    >
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
