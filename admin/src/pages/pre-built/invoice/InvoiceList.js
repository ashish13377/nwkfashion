import React, { useState, useEffect } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, Card, Badge, DropdownItem } from "reactstrap";
import {
  Button,
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  PaginationComponent,
} from "../../../components/Component";
import { Link } from "react-router-dom";
import { invoiceData } from "./Invoice";
import axios from "axios";
import { serverAPI } from "../../../index";
import { Spinner } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
const InvoiceList = () => {
  const [data, setData] = useState([]);
  const [resData, setResData] = useState([]);
  const [onSearch, setonSearch] = useState(true);
  const [onSearchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [sort, setSortState] = useState("asc");

  const [orders, setOrders] = useState([]);

  function getColorForStatus(status) {
    const colorMappings = {
      Confirmed: "info",
      Shipped: "warning",
      Delivered: "success",
    };

    return colorMappings[status] || "danger"; // Default to 'danger' for unrecognized statuses
  }

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

  // Sorting data
  const sortFunc = () => {
    let defaultData = data;
    if (sort === "dsc") {
      let sortedData = defaultData.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
      setData([...sortedData]);
    } else if (sort === "asc") {
      let sortedData = defaultData.sort((a, b) => parseFloat(b.id) - parseFloat(a.id));
      setData([...sortedData]);
    }
  };

  // Changing state value when searching name
  useEffect(() => {
    if (onSearchText !== "") {
      const filteredObject = data.filter((item) => {
        return item.orderID.includes(onSearchText);
      });
      setData([...filteredObject]);
    } else setData(resData);
  }, [onSearchText]);

  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.reverse().slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch);

  return (
    <React.Fragment>
      <Head title="Invoice List"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>Invoices</BlockTitle>
              <BlockDes className="text-soft">
                <p>You have total {data.length} invoices.</p>
              </BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              <ul className="nk-block-tools g-3">
                <li>
                  {/* <Button color="primary" className="btn-icon">
                    <Icon name="plus"></Icon>
                  </Button> */}
                </li>
              </ul>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <Card className="card-stretch">
            <div className="card-inner-group">
              <div className="card-inner">
                <div className="card-title-group">
                  <div className="card-title">
                    <h5 className="title">All Invoices</h5>
                  </div>
                  <div className="card-tools me-n1">
                    <ul className="btn-toolbar">
                      {/* <li>
                        <Button onClick={toggle} className="btn-icon search-toggle toggle-search">
                          <Icon name="search"></Icon>
                        </Button>
                      </li> */}
                      <li className="btn-toolbar-sep"></li>
                      <li>
                        {/* <UncontrolledDropdown>
                          <DropdownToggle tag="a" className="dropdown-toggle btn btn-icon btn-trigger">
                            <Icon name="setting"></Icon>
                          </DropdownToggle>
                          <DropdownMenu end>
                            <ul className="link-check">
                              <li>
                                <span>Show</span>
                              </li>
                              <li className={itemPerPage === 10 ? "active" : ""}>
                                <DropdownItem
                                  tag="a"
                                  href="#dropdownitem"
                                  onClick={(ev) => {
                                    ev.preventDefault();
                                    setItemPerPage(10);
                                  }}
                                >
                                  10
                                </DropdownItem>
                              </li>
                              <li className={itemPerPage === 15 ? "active" : ""}>
                                <DropdownItem
                                  tag="a"
                                  href="#dropdownitem"
                                  onClick={(ev) => {
                                    ev.preventDefault();
                                    setItemPerPage(15);
                                  }}
                                >
                                  15
                                </DropdownItem>
                              </li>
                            </ul>
                            <ul className="link-check">
                              <li>
                                <span>Order</span>
                              </li>
                              <li className={sort === "dsc" ? "active" : ""}>
                                <DropdownItem
                                  tag="a"
                                  href="#dropdownitem"
                                  onClick={(ev) => {
                                    ev.preventDefault();
                                    setSortState("dsc");
                                    sortFunc("dsc");
                                  }}
                                >
                                  DESC
                                </DropdownItem>
                              </li>
                              <li className={sort === "asc" ? "active" : ""}>
                                <DropdownItem
                                  tag="a"
                                  href="#dropdownitem"
                                  onClick={(ev) => {
                                    ev.preventDefault();
                                    setSortState("asc");
                                    sortFunc("asc");
                                  }}
                                >
                                  ASC
                                </DropdownItem>
                              </li>
                            </ul>
                          </DropdownMenu>
                        </UncontrolledDropdown> */}
                      </li>
                    </ul>
                  </div>
                  <div className={`card-search search-wrap ${!onSearch ? "active" : ""}`}>
                    <div className="search-content">
                      <Button
                        className="search-back btn-icon toggle-search"
                        onClick={() => {
                          setSearchText("");
                          toggle();
                        }}
                      >
                        <Icon name="arrow-left"></Icon>
                      </Button>
                      <input
                        type="text"
                        className="form-control border-transparent form-focus-none"
                        placeholder="Search by Order Id"
                        value={onSearchText}
                        onChange={(e) => onFilterChange(e)}
                      />
                      <Button className="search-submit btn-icon">
                        <Icon name="search"></Icon>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-inner p-0">
                <table className="table table-orders">
                  <thead className="tb-odr-head">
                    <tr className="tb-odr-item">
                      <th className="tb-odr-info">
                        <span className="tb-odr-id">Order ID</span>
                        <span className="tb-odr-date d-none d-md-inline-block">Date</span>
                      </th>
                      <th className="tb-odr-amount">
                        <span className="tb-odr-total">Purchased</span>
                        <span className="tb-odr-status d-none d-md-inline-block">Customer</span>
                      </th>
                      <th className="tb-odr-amount">
                        <span className="tb-odr-total">Amount</span>
                        <span className="tb-odr-status d-none d-md-inline-block">Status</span>
                      </th>

                      <th className="tb-odr-action">&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody className="tb-odr-body">
                    {currentItems.length > 0
                      ? currentItems.map((item) => {
                          return (
                            <tr className="tb-odr-item" key={item._id}>
                              <td className="tb-odr-info">
                                <span className="tb-odr-id">
                                  <Link to={`/admin/invoice-details/${item._id}`}>#{item.orderID}</Link>
                                </span>
                                <span className="tb-odr-date">{item.date}</span>
                              </td>
                              <td className="tb-odr-amount">
                                <span className="tb-odr-total">
                                  <span className="amount">
                                    {" "}
                                    {item.productDetails ? (
                                      <span className="tb-sub text-primary"> {item.productDetails.length} item</span>
                                    ) : null}
                                  </span>
                                </span>
                                <span className="tb-odr-status">
                                  {item.customerInfo ? <span className="tb-sub">{item.customerInfo.name}</span> : null}
                                </span>
                              </td>
                              <td className="tb-odr-amount">
                                <span className="tb-odr-total">
                                  <span className="amount">₹ {parseFloat(item.totalPrice).toFixed(2)}</span>
                                </span>
                                <span className="tb-odr-status">
                                  <span className={`dot bg-${getColorForStatus(item.orderStatus)} d-sm-none`}></span>
                                  <Badge
                                    className="badge-sm badge-dot has-bg d-none d-sm-inline-flex"
                                    color={getColorForStatus(item.orderStatus)}
                                  >
                                    {item.orderStatus}
                                  </Badge>
                                </span>
                              </td>

                              <td className="tb-odr-action">
                                <div className="tb-odr-btns d-none d-sm-inline">
                                  <Link to={`/admin/invoice-print/${item._id}`} target="_blank">
                                    <Button color="primary" size="sm" className="btn-icon btn-white btn-dim">
                                      <Icon name="printer-fill"></Icon>
                                    </Button>
                                  </Link>
                                  <Link to={`/admin/invoice-details/${item._id}`}>
                                    <Button color="primary" size="sm" className="btn btn-dim">
                                      View
                                    </Button>
                                  </Link>
                                </div>
                                <Link to={`/admin/invoice-details/${item._id}`}>
                                  <Button className="btn-pd-auto d-sm-none">
                                    <Icon name="chevron-right"></Icon>
                                  </Button>
                                </Link>
                              </td>
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </table>
              </div>
              <div className="card-inner">
                {currentItems.length > 0 ? (
                  <PaginationComponent
                    noDown
                    itemPerPage={itemPerPage}
                    totalItems={data.length}
                    paginate={paginate}
                    currentPage={currentPage}
                  />
                ) : (
                  <div className="text-center">
                    <span className="text-silent">No data found</span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </Block>
      </Content>
    </React.Fragment>
  );
};
export default InvoiceList;
