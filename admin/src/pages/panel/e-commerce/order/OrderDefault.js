import React, { useEffect, useState } from "react";
import Head from "../../../../layout/head/Head";
import Content from "../../../../layout/content/Content";
import DatePicker from "react-datepicker";
import { orderData } from "./OrderData";
import {
  Block,
  BlockHeadContent,
  BlockTitle,
  BlockBetween,
  BlockHead,
  DataTableHead,
  DataTableItem,
  DataTableRow,
  Icon,
  TooltipComponent,
  PaginationComponent,
  PreviewAltCard,
  Row,
  Col,
  RSelect,
} from "../../../../components/Component";
import { getDateStructured } from "../../../../utils/Utils";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Button,
  Modal,
  ModalBody,
  Badge,
} from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { serverAPI } from "../../../..";
import { Spinner } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const OrderDefault = () => {
  const [data, setData] = useState([]);
  const [resData, setResData] = useState([]);
  const [smOption, setSmOption] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    orderId: "",
    date: new Date(),
    status: "Delivered",
    customer: "",
    purchased: "",
    total: "",
    productDetails: [],
    address: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      phoneNo: "",
      country: "",
      townCity: "",
      state: "",
      zipCode: "",
    },
    check: false,
  });
  const [view, setView] = useState({
    add: false,
    details: false,
  });
  const [onSearchText, setSearchText] = useState("");
  const [onCouponSearchText, setCouponSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(7);

  const [orders, setOrders] = useState([]);

  function getColorForStatus(status) {
    const colorMappings = {
      Confirmed: "info",
      Shipped: "warning",
      Delivered: "success",
    };

    return colorMappings[status] || "danger"; // Default to 'danger' for unrecognized statuses
  }
  // useEffect(() => {
  //   axios.get('your-api-endpoint')
  //     .then(response => {
  //       // Assuming the response data is in the format you provided
  //       setData(response.data);
  //       const updatedOrders = response.data.map(order => ({
  //         ...order,
  //         color: getColorForStatus(order.orderStatus)
  //       }));
  //       setOrders(updatedOrders);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  const getOrdersdata = async () => {
    // Make the API call to fetch the product
    await axios
      .get(`${serverAPI}orders`)
      .then((response) => {
        const updatedOrders = response.data.map((order) => ({
          ...order,
          color: getColorForStatus(order.orderStatus),
        }));
        setOrders(updatedOrders);
        // Assuming the response data is in the format you provided
        setData(response.data);
        setResData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  };
  useEffect(() => {
    getOrdersdata();
  }, []); // Fetch subcategories when selected category changes

  // Changing state value when searching name
  useEffect(() => {
    if (onSearchText !== "") {
      const filteredObject = data.filter((item) => {
        return item.orderID.includes(onSearchText);
      });
      setData([...filteredObject]);
    } else setData(resData);
  }, [onSearchText]);

  useEffect(() => {
    if (onCouponSearchText !== "") {
      const filteredObject = data?.filter((item) => {
        return item?.couponCode?.includes(onCouponSearchText);
      });
      setData([...filteredObject]);
    } else setData(resData);
  }, [onCouponSearchText]);

  // toggle function to view order details
  const toggle = (type) => {
    setView({
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
    });
  };

  // selects all the order
  const selectorCheck = (e) => {
    let newData;
    newData = data.map((item) => {
      item.check = e.currentTarget.checked;
      return item;
    });
    setData([...newData]);
  };

  // selects one order
  const onSelectChange = (e, id) => {
    let newData = data;
    let index = newData.findIndex((item) => item._id === id);
    newData[index].check = e.currentTarget.checked;
    setData([...newData]);
  };

  // resets forms
  const resetForm = () => {
    setFormData({
      id: null,
      orderId: "",
      date: new Date(),
      status: "Delivered",
      customer: "",
      purchased: "",
      total: "",
      productDetails: [],
      address: {
        firstName: "",
        lastName: "",
        emailAddress: "",
        phoneNo: "",
        country: "",
        townCity: "",
        state: "",
        zipCode: "",
      },
      check: false,
    });
  };

  const onFormSubmit = (form) => {
    const { customer, purchased, total } = form;
    let submittedData = {
      id: data.length + 1,
      orderId: "95981",
      date: getDateStructured(formData.date),
      status: formData.status,
      customer: customer,
      purchased: purchased,
      total: total,
      productDetails: [],
      address: {
        firstName: "",
        lastName: "",
        emailAddress: "",
        phoneNo: "",
        country: "",
        townCity: "",
        state: "",
        zipCode: "",
      },
      check: false,
    };
    setData([submittedData, ...data]);
    setView({ add: false, details: false });
    resetForm();
  };

  useEffect(() => {
    reset(formData);
  }, [formData]);

  // function to load detail data
  const loadDetail = (id) => {
    let index = data.findIndex((item) => item._id === id);
    setFormData(data[index]);
  };

  // OnChange function to get the input data
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };
  const onCouponFilterChange = (e) => {
    setCouponSearchText(e.target.value);
  };

  // function to close the form modal
  const onFormCancel = () => {
    setView({ add: false, details: false });
    resetForm();
  };

  // function to change to approve property for an item
  const markChangesInStatus = async (id, status) => {
    const result = await Swal.fire({
      title: "Confirm Change Status",
      text: `Are you sure you want to Change Status to ${status}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Change it!",
    });

    if (result.isConfirmed) {
      axios
        .put(`${serverAPI}orders/${id}/status`, { status: status })
        .then((response) => {
          // Assuming the API responds with the updated order data
          let newData = data;
          let index = newData.findIndex((item) => item._id === id);
          newData[index].orderStatus = status;
          setData([...newData]);
        })
        .catch((error) => {
          console.error("Error updating order status:", error);
        });
    }
  };

  // function to delete a Order
  const deleteOrder = async (id) => {
    const result = await Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to delete this Order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      axios
        .delete(`${serverAPI}orders/${id}`)
        .then((response) => {
          // Assuming the API responds with the updated order data
          let defaultData = data;
          defaultData = defaultData.filter((item) => item._id !== id);
          setData([...defaultData]);
        })
        .catch((error) => {
          console.error("Error updating order status:", error);
        });
    }
  };

  const selectorDeleteOrder = async () => {
    const result = await Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to delete this Order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      const selectedOrderIds = data.filter((item) => item.check === true).map((item) => item._id);
      const deletePromises = selectedOrderIds.map((orderId) =>
        axios.delete(`${serverAPI}orders/${orderId}`).then((res) => {
          setData(res.data.orders);
        })
      );

      Promise.all(deletePromises)
        .then((responses) => {
          // Assuming the API responds with success messages
          // setData(deletedOrderIds);
        })
        .catch((error) => {
          console.error("Error deleting orders:", error);
        });
    }
  };

  // function to change the complete property of an item
  const selectorMarkAsDelivered = async (status) => {
    const result = await Swal.fire({
      title: "Confirm Change Status",
      text: `Are you sure you want to Change Status to ${status}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Change it!",
    });
    if (result.isConfirmed) {
      const selectedOrderIds = data.filter((item) => item.check === true).map((item) => item._id);
      const deletePromises = selectedOrderIds.map((orderId) =>
        axios.put(`${serverAPI}orders/${orderId}/status`, { status: status }).then((res) => {
          let newData = data;
          let index = newData.findIndex((item) => item._id === orderId);
          newData[index].orderStatus = status;
          setData([...newData]);
        })
      );

      Promise.all(deletePromises)
        .then((responses) => {
          // Assuming the API responds with success messages
          // setData(deletedOrderIds);
        })
        .catch((error) => {
          console.error("Error deleting orders:", error);
        });
    }
    // setData([...newData]);
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.reverse().slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(data);
  return (
    <React.Fragment>
      <Head title="Order Default"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle>Orders</BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <a
                  href="#more"
                  className="btn btn-icon btn-trigger toggle-expand me-n1"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setSmOption(!smOption);
                  }}
                >
                  <Icon name="more-v"></Icon>
                </a>
                <div className="toggle-expand-content" style={{ display: smOption ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <div className="form-control-wrap">
                        <div className="form-icon form-icon-right">
                          <Icon name="search"></Icon>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="default-04"
                          placeholder="Search by orderId"
                          onChange={(e) => onFilterChange(e)}
                        />
                      </div>
                    </li>
                    <li>
                      <div className="form-control-wrap">
                        <div className="form-icon form-icon-right">
                          <Icon name="search"></Icon>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="default-04"
                          placeholder="Search by CouponCode"
                          onChange={(e) => onCouponFilterChange(e)}
                        />
                      </div>
                    </li>
                    {/* <li>
                      <UncontrolledDropdown>
                        <DropdownToggle
                          color="transparent"
                          className="dropdown-toggle dropdown-indicator btn btn-outline-light btn-white"
                        >
                          Status
                        </DropdownToggle>
                        <DropdownMenu end>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                <span>New Items</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                <span>Featured</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                <span>Out of Stock</span>
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li> */}
                    <li className="nk-block-tools-opt">
                      <Button
                        className="toggle btn-icon d-md-none"
                        color="primary"
                        onClick={() => {
                          toggle("add");
                        }}
                      >
                        <Icon name="plus"></Icon>
                      </Button>
                      {/* <Button
                        className="toggle d-none d-md-inline-flex"
                        color="primary"
                        onClick={() => {
                          toggle("add");
                        }}
                      >
                        <Icon name="plus"></Icon>
                        <span>Add Order</span>
                      </Button> */}
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <div className="nk-tb-list is-separate is-medium mb-3">
            <DataTableHead className="nk-tb-item">
              <DataTableRow className="nk-tb-col-check">
                <div className="custom-control custom-control-sm custom-checkbox notext">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="pid-all"
                    onChange={(e) => selectorCheck(e)}
                  />
                  <label className="custom-control-label" htmlFor="pid-all"></label>
                </div>
              </DataTableRow>
              <DataTableRow>
                <span className="sub-text">Order</span>
              </DataTableRow>
              <DataTableRow size="md">
                <span className="sub-text">Date</span>
              </DataTableRow>
              <DataTableRow>
                <span className="sub-text">Status</span>
              </DataTableRow>
              <DataTableRow size="sm">
                <span className="sub-text">Customer</span>
              </DataTableRow>
              <DataTableRow size="md">
                <span className="sub-text">Purchased</span>
              </DataTableRow>
              <DataTableRow size="md">
                <span className="sub-text">Discount</span>
              </DataTableRow>
              <DataTableRow size="md">
                <span className="sub-text">Shipping Fee</span>
              </DataTableRow>
              <DataTableRow size="md">
                <span className="sub-text">Coupon Code</span>
              </DataTableRow>
              <DataTableRow>
                <span className="sub-text">Sub total</span>
              </DataTableRow>
              <DataTableRow>
                <span className="sub-text">GST</span>
              </DataTableRow>
              <DataTableRow>
                <span className="sub-text">Total</span>
              </DataTableRow>

              <DataTableRow className="nk-tb-col-tools">
                <ul className="nk-tb-actions gx-1 my-n1">
                  <li>
                    <UncontrolledDropdown>
                      <DropdownToggle tag="a" className="btn btn-trigger dropdown-toggle btn-icon me-n1">
                        <Icon name="more-h"></Icon>
                      </DropdownToggle>
                      <DropdownMenu end>
                        <ul className="link-list-opt no-bdr">
                          <li>
                            <DropdownItem
                              tag="a"
                              href="#markasdone"
                              onClick={(ev) => {
                                ev.preventDefault();
                                const status = "Pending";
                                selectorMarkAsDelivered(status);
                              }}
                            >
                              <Icon name="repeat-v"></Icon>
                              <span>Mark As Pending</span>
                            </DropdownItem>
                          </li>
                          <li>
                            <DropdownItem
                              tag="a"
                              href="#markasdone"
                              onClick={(ev) => {
                                ev.preventDefault();
                                const status = "Confirmed";
                                selectorMarkAsDelivered(status);
                              }}
                            >
                              <Icon name="check-circle-cut"></Icon>
                              <span>Mark As Confirmed</span>
                            </DropdownItem>
                          </li>
                          <li>
                            <DropdownItem
                              tag="a"
                              href="#markasdone"
                              onClick={(ev) => {
                                ev.preventDefault();
                                const status = "Shipped";
                                selectorMarkAsDelivered(status);
                              }}
                            >
                              <Icon name="package-fill"></Icon>
                              <span>Mark As Shipped</span>
                            </DropdownItem>
                          </li>
                          <li>
                            <DropdownItem
                              tag="a"
                              href="#markasdone"
                              onClick={(ev) => {
                                ev.preventDefault();
                                const status = "Delivered";
                                selectorMarkAsDelivered(status);
                              }}
                            >
                              <Icon name="truck"></Icon>
                              <span>Mark As Delivered</span>
                            </DropdownItem>
                          </li>
                          <li>
                            <DropdownItem
                              tag="a"
                              href="#remove"
                              onClick={(ev) => {
                                ev.preventDefault();
                                selectorDeleteOrder();
                              }}
                            >
                              <Icon name="trash"></Icon>
                              <span>Remove Orders</span>
                            </DropdownItem>
                          </li>
                        </ul>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </li>
                </ul>
              </DataTableRow>
            </DataTableHead>

            {currentItems.length > 0
              ? currentItems.map((item) => (
                  <DataTableItem key={item._id}>
                    <DataTableRow className="nk-tb-col-check">
                      <div className="custom-control custom-control-sm custom-checkbox notext">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          defaultChecked={item.check}
                          id={item._id + "oId-all"}
                          key={Math.random()}
                          onChange={(e) => onSelectChange(e, item._id)}
                        />
                        <label className="custom-control-label" htmlFor={item._id + "oId-all"}></label>
                      </div>
                    </DataTableRow>
                    <DataTableRow>
                      <a href="#id" onClick={(ev) => ev.preventDefault()}>
                        #{item.orderID}
                      </a>
                    </DataTableRow>
                    <DataTableRow size="md">
                      <span>{item.date}</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className={`dot bg-${getColorForStatus(item.orderStatus)} d-sm-none`}></span>
                      <Badge
                        className="badge-sm badge-dot has-bg d-none d-sm-inline-flex"
                        color={getColorForStatus(item.orderStatus)}
                      >
                        {item.orderStatus}
                      </Badge>
                    </DataTableRow>
                    <DataTableRow size="sm">
                      {item.customerInfo ? <span className="tb-sub">{item.customerInfo.name}</span> : null}
                    </DataTableRow>
                    <DataTableRow size="md">
                      {item.productDetails ? (
                        <span className="tb-sub text-primary"> {item.productDetails.length} item</span>
                      ) : null}
                    </DataTableRow>
                    <DataTableRow>
                      <span className="tb-lead">
                        {item.discount ? <>₹{parseFloat(item.discount).toFixed(2)}</> : <>--</>}
                      </span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="tb-lead">₹{parseFloat(item.shippingFee).toFixed(2)}</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="tb-lead">{item.couponCode ? item.couponCode : <>--</>}</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="tb-lead">₹ {parseFloat(item.subTotal).toFixed(2)}</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="tb-lead">₹ {parseFloat(item.gst).toFixed(2)}</span>
                    </DataTableRow>

                    <DataTableRow>
                      <span className="tb-lead">₹ {parseFloat(item.totalPrice).toFixed(2)}</span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-col-tools">
                      <ul className="nk-tb-actions gx-1">
                        {item.orderStatus !== "Confirmed" && (
                          <li
                            className="nk-tb-action-hidden"
                            onClick={() => markChangesInStatus(item._id, "Confirmed")}
                          >
                            <TooltipComponent
                              tag="a"
                              containerClassName="btn btn-trigger btn-icon"
                              id={"delivery" + item.id}
                              icon="check-circle-cut"
                              direction="top"
                              text="Mark as Confirmed"
                            />
                          </li>
                        )}

                        <li
                          className="nk-tb-action-hidden"
                          onClick={() => {
                            loadDetail(item._id);
                            toggle("details");
                          }}
                        >
                          <TooltipComponent
                            tag="a"
                            containerClassName="btn btn-trigger btn-icon"
                            id={"view" + item.id}
                            icon="eye"
                            direction="top"
                            text="View Details"
                          />
                        </li>
                        <li>
                          <UncontrolledDropdown>
                            <DropdownToggle tag="a" className="btn btn-icon dropdown-toggle btn-trigger">
                              <Icon name="more-h"></Icon>
                            </DropdownToggle>
                            <DropdownMenu end>
                              <ul className="link-list-opt no-bdr">
                                <li>
                                  <DropdownItem
                                    tag="a"
                                    href="#dropdown"
                                    onClick={(ev) => {
                                      ev.preventDefault();
                                      loadDetail(item._id);
                                      toggle("details");
                                    }}
                                  >
                                    <Icon name="eye"></Icon>
                                    <span>Order Details</span>
                                  </DropdownItem>
                                </li>

                                {item.orderStatus !== "Pending" && (
                                  <li>
                                    <DropdownItem
                                      tag="a"
                                      href="#dropdown"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                        const status = "Pending";
                                        markChangesInStatus(item._id, status);
                                      }}
                                    >
                                      <Icon name="repeat-v"></Icon>
                                      <span>Mark as Pending</span>
                                    </DropdownItem>
                                  </li>
                                )}

                                {item.orderStatus !== "Confirmed" && (
                                  <li>
                                    <DropdownItem
                                      tag="a"
                                      href="#dropdown"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                        const orderStaust = "Confirmed";
                                        markChangesInStatus(item._id, orderStaust);
                                      }}
                                    >
                                      <Icon name="check-circle-cut"></Icon>
                                      <span>Mark as Confirmed</span>
                                    </DropdownItem>
                                  </li>
                                )}

                                {item.orderStatus !== "Shipped" && (
                                  <li>
                                    <DropdownItem
                                      tag="a"
                                      href="#dropdown"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                        const orderStaust = "Shipped";
                                        markChangesInStatus(item._id, orderStaust);
                                      }}
                                    >
                                      <Icon name="package-fill"></Icon>
                                      <span>Mark as Shipped</span>
                                    </DropdownItem>
                                  </li>
                                )}

                                {item.orderStatus !== "Delivered" && (
                                  <li>
                                    <DropdownItem
                                      tag="a"
                                      href="#dropdown"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                        const orderStaust = "Delivered";
                                        markChangesInStatus(item._id, orderStaust);
                                      }}
                                    >
                                      <Icon name="truck"></Icon>
                                      <span>Mark as Delivered</span>
                                    </DropdownItem>
                                  </li>
                                )}

                                <li>
                                  <DropdownItem
                                    tag="a"
                                    href="#dropdown"
                                    onClick={(ev) => {
                                      ev.preventDefault();
                                      deleteOrder(item._id);
                                    }}
                                  >
                                    <Icon name="trash"></Icon>
                                    <span>Remove Order</span>
                                  </DropdownItem>
                                </li>
                              </ul>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </li>
                      </ul>
                    </DataTableRow>
                  </DataTableItem>
                ))
              : null}
          </div>
          <PreviewAltCard>
            {data.length > 0 ? (
              <PaginationComponent
                itemPerPage={itemPerPage}
                totalItems={data.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            ) : (
              <div className="text-center">
                <span className="text-silent">No orders found</span>
              </div>
            )}
          </PreviewAltCard>
        </Block>

        <Modal isOpen={view.add} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a href="#cancel" className="close">
              {" "}
              <Icon
                name="cross-sm"
                onClick={(ev) => {
                  ev.preventDefault();
                  onFormCancel();
                }}
              ></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Add Order</h5>
              <div className="mt-4">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                  <Row className="g-3">
                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Customer Name
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            {...register("customer", {
                              required: "This field is required",
                            })}
                            onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                            value={formData.customer}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="date">
                          Date of order
                        </label>
                        <div className="form-control-wrap">
                          <DatePicker
                            selected={formData.date}
                            className="form-control"
                            onChange={(date) => setFormData({ ...formData, date: date })}
                          />
                          {errors.date && <span className="invalid">{errors.date.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                          Purchased Product
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            {...register("purchased", { required: "This is required" })}
                            value={formData.purchased}
                            onChange={(e) => setFormData({ ...formData, purchased: e.target.value })}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="total">
                          Total Price
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            className="form-control"
                            {...register("total", { required: "This is required" })}
                            value={formData.total}
                            onChange={(e) => setFormData({ ...formData, total: e.target.value })}
                          />
                          {errors.total && <span className="invalid">{errors.total.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="status">
                          Status
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="status"
                            options={[
                              { value: "On Hold", label: "On Hold" },
                              { value: "Delivered", label: "Delivered" },
                            ]}
                            onChange={(e) => setFormData({ ...formData, status: e.value })}
                            value={{ value: formData.status, label: formData.status }}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col size="12">
                      <Button color="primary" type="submit">
                        <Icon className="plus"></Icon>
                        <span>Add Order</span>
                      </Button>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </ModalBody>
        </Modal>

        <Modal isOpen={view.details} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a href="#cancel" className="close">
              {" "}
              <Icon
                name="cross-sm"
                onClick={(ev) => {
                  ev.preventDefault();
                  onFormCancel();
                }}
              ></Icon>
            </a>
            <div className="nk-tnx-details mt-sm-3">
              <div className="nk-modal-head mb-3">
                <h5 className="title">Order Details</h5>
              </div>
              <Row className="gy-3">
                <Col lg={6}>
                  <span className="sub-text">Order Id</span>
                  <span className="caption-text">#{formData.orderID}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Status</span>
                  <span className={`dot bg-${getColorForStatus(formData.orderStatus)} d-sm-none`}></span>
                  <Badge
                    className="badge-sm badge-dot has-bg d-none d-sm-inline-flex"
                    color={getColorForStatus(formData.orderStatus)}
                  >
                    {formData.orderStatus}
                  </Badge>
                </Col>
                <Col lg={12}>
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
                          {formData.productDetails.map((product, index) => (
                            <tr key={index}>
                              <td>{product.title}</td>
                              <td>
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
                                        <div>
                                          <b>Selected dress Id:</b>
                                          {selectedDress.selectedDressId}
                                        </div>
                                        <div>
                                          <b>Selected dress description: </b>
                                          {product.description}
                                        </div>
                                      </>
                                    );
                                  }

                                  return null;
                                })}
                              </td>
                              <td>₹ {product.price}</td>
                              <td>{product.quantiti}</td>
                              <td>₹ {product.price * product.quantiti}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan="2"></td>
                            <td colSpan="2">Subtotal</td>
                            <td>₹ {formData.subTotal}</td>
                          </tr>
                          <tr>
                            <td colSpan="2"></td>
                            <td colSpan="2">Shipping fee</td>
                            <td>₹ {formData.shippingFee}</td>
                          </tr>
                          <tr>
                            <td colSpan="2"></td>
                            <td colSpan="2">GST</td>
                            <td>₹ {formData.gst}</td>
                          </tr>
                          <tr>
                            <td colSpan="2"></td>
                            <td colSpan="2">Discount</td>
                            <td>₹ {formData.discount ? <>{formData.discount}</> : <></>}</td>
                          </tr>
                          <tr>
                            <td colSpan="2"></td>
                            <td colSpan="2">Grand Total</td>
                            <td>₹ {formData.totalPrice}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="nk-modal-head mb-3">
                <h5 className="title">Address Details</h5>
              </div>
              <Row className="gy-3">
                <Col lg={4}>
                  <span className="sub-text">First Name</span>
                  <span className="caption-text">{formData.address.firstName}</span>
                </Col>
                <Col lg={4}>
                  <span className="sub-text">Last Name</span>
                  <span className="caption-text">{formData.address.lastName}</span>
                </Col>
                <Col lg={4}>
                  <span className="sub-text">Email Address</span>
                  <span className="caption-text">{formData.address.emailAddress}</span>
                </Col>
                <Col lg={4}>
                  <span className="sub-text">Phone Number</span>
                  <span className="caption-text">{formData.address.phoneNo}</span>
                </Col>
                <Col lg={4}>
                  <span className="sub-text">Country</span>
                  <span className="caption-text">{formData.address.country}</span>
                </Col>
                <Col lg={4}>
                  <span className="sub-text">Town/City</span>
                  <span className="caption-text">{formData.address.townCity}</span>
                </Col>
                <Col lg={4}>
                  <span className="sub-text">State</span>
                  <span className="caption-text">{formData.address.state}</span>
                </Col>
                <Col lg={4}>
                  <span className="sub-text">Zip Code</span>
                  <span className="caption-text">{formData.address.zipCode}</span>
                </Col>
              </Row>
            </div>
          </ModalBody>
        </Modal>
      </Content>
    </React.Fragment>
  );
};

export default OrderDefault;
