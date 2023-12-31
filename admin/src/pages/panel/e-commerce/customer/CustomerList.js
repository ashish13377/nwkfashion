import React, { useContext, useEffect, useState } from "react";
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";
import { DropdownMenu, DropdownToggle, UncontrolledDropdown, DropdownItem } from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Col,
  UserAvatar,
  PaginationComponent,
  Button,
  DataTableHead,
  DataTableRow,
  DataTableItem,
  TooltipComponent,
  RSelect,
  PreviewAltCard,
} from "../../../../components/Component";
import { filterStatus, CustomerData } from "./CustomerData";
import { findUpper } from "../../../../utils/Utils";
import { Link } from "react-router-dom";
import { CustomerContext } from "./CustomerContext";
import EditModal from "./EditModal";
import AddModal from "./AddModal";
import axios from "axios";
import { serverAPI } from "../../../..";
import { Spinner } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const CustomerList = () => {
  const { contextData } = useContext(CustomerContext);
  const [data, setData] = useState([]);

  const [sm, updateSm] = useState(false);
  const [onSearchText] = useState("");
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });
  const [editId, setEditedId] = useState();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    balance: 0,
    phone: "",
    status: "Active",
  });
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    balance: 0,
    phone: "",
    status: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(10);

  const getOrdersdata = async () => {
    // Make the API call to fetch the product
    await axios
      .get(`${serverAPI}users/users`)
      .then((response) => {
        // Assuming the response data is in the format you provided
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  };
  useEffect(() => {
    getOrdersdata();
  }, [data]); // Fetch subcategories when selected category changes

  // // unselects the data on mount
  // useEffect(() => {
  //   let newData;
  //   newData = CustomerData.map((item) => {
  //     item.checked = false;
  //     return item;
  //   });
  //   setData([...newData]);
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // // Changing state value when searching name
  // useEffect(() => {
  //   if (onSearchText !== "") {
  //     const filteredObject = CustomerData.filter((item) => {
  //       return (
  //         item.name.toLowerCase().includes(onSearchText.toLowerCase()) ||
  //         item.email.toLowerCase().includes(onSearchText.toLowerCase())
  //       );
  //     });
  //     setData([...filteredObject]);
  //   } else {
  //     setData([...CustomerData]);
  //   }
  // }, [onSearchText, setData]);

  // function to change the selected property of an item
  const onSelectChange = (e, id) => {
    let newData = data;
    let index = newData.findIndex((item) => item._id === id);
    newData[index].checked = e.currentTarget.checked;
    setData([...newData]);
  };

  // // function to reset the form
  // const resetForm = () => {
  //   setFormData({
  //     name: "",
  //     email: "",
  //     balance: 0,
  //     phone: "",
  //     status: "Active",
  //   });
  // };

  // const closeModal = () => {
  //   setModal({ add: false })
  //   resetForm();
  // };

  // const closeEditModal = () => {
  //   setModal({ edit: false })
  //   resetForm();
  // };

  // // submit function to add a new item
  // const onFormSubmit = (submitData) => {
  //   const { name, email, balance, phone } = submitData;
  //   let submittedData = {
  //     id: data.length + 1,
  //     avatarBg: "purple",
  //     name: name,
  //     role: "Customer",
  //     email: email,
  //     balance: balance,
  //     phone: phone,
  //     emailStatus: "success",
  //     kycStatus: "alert",
  //     lastLogin: "10 Feb 2020",
  //     status: formData.status,
  //     country: "Bangladesh",
  //   };
  //   setData([submittedData, ...data]);
  //   resetForm();
  //   setModal({ edit: false }, { add: false });
  // };

  // // submit function to update a new item
  // const onEditSubmit = (submitData) => {
  //   const { name, email, phone } = submitData;
  //   let submittedData;
  //   let newitems = data;
  //   newitems.forEach((item) => {
  //     if (item.id === editId) {
  //       submittedData = {
  //         id: item.id,
  //         avatarBg: item.avatarBg,
  //         name: name,
  //         image: item.image,
  //         role: item.role,
  //         email: email,
  //         balance: editFormData.balance,
  //         phone: phone,
  //         emailStatus: item.emailStatus,
  //         kycStatus: item.kycStatus,
  //         lastLogin: item.lastLogin,
  //         status: editFormData.status,
  //         country: item.country,
  //       };
  //     }
  //   });
  //   let index = newitems.findIndex((item) => item.id === editId);
  //   newitems[index] = submittedData;
  //   setModal({ edit: false });
  // };

  // // function that loads the want to editted data
  // const onEditClick = (id) => {
  //   data.forEach((item) => {
  //     if (item.id === id) {
  //       setEditFormData({
  //         name: item.name,
  //         email: item.email,
  //         status: item.status,
  //         phone: item.phone,
  //         balance: item.balance,
  //       });
  //       setModal({ edit: true }, { add: false });
  //       setEditedId(id);
  //     }
  //   });
  // };

  // // function to change to suspend property for an item
  // const suspendUser = (id) => {
  //   let newData = data;
  //   let index = newData.findIndex((item) => item.id === id);
  //   newData[index].status = "Suspend";
  //   setData([...newData]);
  // };

  // function to change the check property of an item
  const selectorCheck = (e) => {
    let newData;
    newData = data.map((item) => {
      item.checked = e.currentTarget.checked;
      return item;
    });
    setData([...newData]);
  };

  // // function to delete the seletected item
  // const selectorDeleteUser = () => {
  //   let newData;
  //   newData = data.filter((item) => item.checked !== true);
  //   setData([...newData]);
  // };

  // // function to change the complete property of an item
  // const selectorSuspendUser = () => {
  //   let newData;
  //   newData = data.map((item) => {
  //     if (item.checked === true) item.status = "Suspend";
  //     return item;
  //   });
  //   setData([...newData]);
  // };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <React.Fragment>
      <Head title="User List - Default"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h3" page>
                Users Lists
              </BlockTitle>
              {/* <BlockDes className="text-soft">
              
              </BlockDes> */}
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <div className="nk-tb-list is-separate is-medium mb-3">
            <DataTableHead className="nk-tb-item">
              <DataTableRow>
                <span className="sub-text">User</span>
              </DataTableRow>
              <DataTableRow size="mb">
                <span className="sub-text">Last orders amount</span>
              </DataTableRow>
              <DataTableRow size="lg">
                <span className="sub-text">Last Order</span>
              </DataTableRow>
              <DataTableRow size="md">
                <span className="sub-text">Phone</span>
              </DataTableRow>
              <DataTableRow size="md">
                <span className="sub-text">Email</span>
              </DataTableRow>
              <DataTableRow size="lg">
                <span className="sub-text">Country</span>
              </DataTableRow>
            </DataTableHead>
            {/*Head*/}
            {currentItems.length > 0
              ? currentItems.map((item) => (
                  <DataTableItem key={item._id}>
                    <DataTableRow>
                      <Link to={`/admin/ecommerce/customer-details/${item._id}`}>
                        <div className="user-card">
                          <UserAvatar theme={item.avatarBg} text={findUpper(item.name)} image={item.image}></UserAvatar>
                          <div className="user-info">
                            <span className="tb-lead">
                              {item.name} <span className="dot dot-success d-md-none ms-1"></span>
                            </span>
                            <span>{item.email}</span>
                          </div>
                        </div>
                      </Link>
                    </DataTableRow>
                    <DataTableRow size="mb">
                      <span className="tb-amount">
                        {item.lastOrderAmount ? (
                          <>
                            {" "}
                            <span className="currency">₹ </span> {item.lastOrderAmount}
                          </>
                        ) : (
                          <>not have</>
                        )}
                      </span>
                    </DataTableRow>
                    <DataTableRow size="lg">
                      <span>{item.lastOrderDate ? <> {item.lastOrderDate}</> : <>not have</>}</span>
                    </DataTableRow>
                    <DataTableRow size="md">
                      <span>{item.phone ? <> {item.phone}</> : <>not have</>}</span>
                    </DataTableRow>
                    <DataTableRow size="md">
                      <span>{item.email}</span>
                    </DataTableRow>
                    <DataTableRow size="lg">
                      <span>{item.country ? <> {item.country}</> : <>not have</>}</span>
                    </DataTableRow>
                  </DataTableItem>
                ))
              : null}
          </div>
          <PreviewAltCard>
            {currentItems.length > 0 ? (
              <PaginationComponent
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
          </PreviewAltCard>
        </Block>

        {/* <AddModal modal={modal.add} formData={formData} setFormData={setFormData} closeModal={closeModal} onSubmit={onFormSubmit} filterStatus={filterStatus} />
        <EditModal modal={modal.edit} formData={editFormData} setFormData={setEditFormData} closeModal={closeEditModal} onSubmit={onEditSubmit} filterStatus={filterStatus} /> */}
      </Content>
    </React.Fragment>
  );
};
export default CustomerList;
