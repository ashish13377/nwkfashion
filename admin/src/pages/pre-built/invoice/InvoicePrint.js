import React, { useState, useEffect } from "react";
import { Button, Icon, Block } from "../../../components/Component";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import LogoDark from "../../../images/logo-dark2x.png";
import { invoiceData } from "./Invoice";
import { useParams } from "react-router-dom";
import axios from "axios";
import { serverAPI } from "../../../index";
import { Spinner } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
const InvoicePrint = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState();

  const getOrdersdata = async () => {
    // Make the API call to fetch the product
    await axios
      .get(`${serverAPI}orders`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  };
  useEffect(() => {
    getOrdersdata();
  }, []); // Fetch subcategories when selected category changes

  let { invoiceId } = useParams();

  useEffect(() => {
    setTimeout(() => window.print(), 1000);
  }, [user]);

  useEffect(() => {
    const id = invoiceId;
    if (id !== undefined || null || "") {
      let spUser = data.find((item) => item._id === id);
      setUser(spUser);
    } else {
      setUser(data[0]);
    }
  }, [invoiceId, data]);

  return (
    <body className="bg-white">
      <Head title="Invoice Print"></Head>
      {user && (
        <Content>
          <Block>
            <div className="invoice invoice-print">
              <div className="invoice-action">
                <Button
                  size="lg"
                  color="primary"
                  outline
                  className="btn-icon btn-white btn-dim"
                  onClick={() => window.print()}
                >
                  <Icon name="printer-fill"></Icon>
                </Button>
              </div>
              <div className="invoice-wrap">
                <div className="invoice-brand text-center">
                  <img src={LogoDark} alt="" />
                </div>

                <div className="invoice-head">
                  <div className="invoice-contact">
                    <span className="overline-title">Invoice To</span>
                    <div className="invoice-contact-info">
                      <h4 className="title">{user.address.firstName + " " + user.address.lastName}</h4>
                      <ul className="list-plain">
                        <li>
                          <Icon name="map-pin-fill"></Icon>
                          <span>
                            {user.address.townCity + ", " + user.address.state}
                            <br />
                            {user.address.country + ", " + user.address.zipCode}
                          </span>
                        </li>
                        <li>
                          <Icon name="call-fill"></Icon>
                          <span>{user.address.phoneNo}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="invoice-desc">
                    <h3 className="title">Invoice</h3>
                    <ul className="list-plain">
                      <li className="invoice-id">
                        <span>Invoice ID</span>:<span>{user.orderID}</span>
                      </li>
                      <li className="invoice-date">
                        <span>Date</span>:<span>{user.date}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="invoice-bills">
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th className="w-150px">Item Name</th>
                          <th className="w-60">Description</th>
                          <th>Price</th>
                          <th>Qty</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {user.productDetails.map((product, index) => (
                          <tr key={index}>
                            <td>
                              {product.title}
                              {product.colors.map((color) => {
                                const selectedDress = product.selectedDressInfo.find(
                                  (dress) => color._id === dress.selectedDressId
                                );

                                if (selectedDress) {
                                  return (
                                    <>
                                      <img
                                        key={color._id}
                                        src={selectedDress.selectedDressImg}
                                        alt="productImage"
                                        height="100px"
                                      />
                                      {/* <div>
                                        <b>Selected dress Id:</b>
                                        {selectedDress.selectedDressId}
                                      </div> */}
                                    </>
                                  );
                                }

                                return null;
                              })}
                            </td>
                            <td>{product.description}</td>
                            <td>₹ {product.price.replace("$", "")}</td>
                            <td>1</td>
                            <td>₹ {product.price.replace("$", "")}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan="2"></td>
                          <td colSpan="2">Subtotal</td>
                          <td>
                            ₹{" "}
                            {user.productDetails
                              .reduce((acc, product) => acc + parseFloat(product.price.slice(1)), 0)
                              .toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2"></td>
                          <td colSpan="2">Processing fee</td>
                          <td>$10.00</td>
                        </tr>
                        <tr>
                          <td colSpan="2"></td>
                          <td colSpan="2">TAX</td>
                          <td>$50.00</td>
                        </tr>
                        <tr>
                          <td colSpan="2"></td>
                          <td colSpan="2">Grand Total</td>
                          <td>₹ {user.totalPrice}</td>
                        </tr>
                      </tfoot>
                    </table>
                    <div className="nk-notes ff-italic fs-12px text-soft">
                      Invoice was created on a computer and is valid without the signature and seal.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Block>
        </Content>
      )}
    </body>
  );
};

export default InvoicePrint;
