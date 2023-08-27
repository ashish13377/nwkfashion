import React, { useState, useRef, useEffect } from "react";
import Head from "../../../../layout/head/Head";
import { DropzoneArea } from "react-dropzone";
import { CloudinaryContext, Image } from "cloudinary-react";

import Content from "../../../../layout/content/Content";
import {
  Block,
  BlockHead,
  BlockTitle,
  BlockBetween,
  BlockHeadContent,
  BlockDes,
  Icon,
  Row,
  Col,
  PreviewAltCard,
  TooltipComponent,
  PaginationComponent,
  Button,
  DataTableHead,
  DataTableRow,
  DataTableItem,
  RSelect,
} from "../../../../components/Component";
import { DropdownItem, UncontrolledDropdown, DropdownMenu, DropdownToggle, Badge } from "reactstrap";
import SimpleBar from "simplebar-react";
import { useForm } from "react-hook-form";
import ProductH from "../../../../images/product/h.png";
import Dropzone from "react-dropzone";
import { Modal, ModalBody } from "reactstrap";
import axios from "axios";
import { serverAPI } from "../../../..";
import { Spinner } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const ProductList = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(7);
  const getProductdata = async () => {
    // Make the API call to fetch the product
    await axios
      .get(`${serverAPI}products`)
      .then((response) => {
        // Assuming the response data is in the format you provided
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  };
  useEffect(() => {
    getProductdata();
  }, []); // Fetch subcategories when selected category changes
  console.log(data);
  const [categories, setCategories] = useState([]);

  const [sm, updateSm] = useState(false);
  const [formData, setFormData] = useState({
    imageSrc: "product_image_url_1.jpg",
    title: "",
    rating: "",
    sizes: ["S", "M", "L"],
    colors: [
      {
        color: "",
        zoomImage: "",
      },
    ],
    price: 0,
    categoryId: "",
    categoryName: "",
    description: "",
    availability: "",
    quantity: 100,
    socialMedia: [
      {
        name: "Facebook",
        icon: "facebook_icon_url.png",
      },
      {
        name: "Twitter",
        icon: "twitter_icon_url.png",
      },
    ],
    compositions: "",
    styles: "Casual",
    properties: "Soft and comfortable",
    zoomImage: "product_zoom_image_url.jpg",
    image: "",
    productType: "Type 1",
  });
  console.log(formData);
  const [inputText, setInputText] = useState("");

  const [catFormData, setCatFormData] = useState({
    name: "",
    image: "",
  });

  const [subFormData, setSubFormData] = useState({
    categoryName: "",
    name: "",
  });

  const resetCatForm = () => {
    setCatFormData({
      name: "",
      image: "",
    });
  };

  const resetsubForm = () => {
    setSubFormData({
      categoryName: "",
      name: "",
    });
  };

  useEffect(() => {
    // Make the API call to fetch the categories
    axios
      .get(`${serverAPI}categories`)
      .then((response) => {
        // Assuming the response data is in the format you provided
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    // Make the API call to fetch the subcategories based on selected category
  }, [formData.category]); // Fetch subcategories when selected category changes

  const handleCategoryChange = (selectedOption) => {
    const selectedCategory = categories.find((category) => category.name === selectedOption.label);
    // Update the category field and categoryId in formData with the selected category
    setFormData({
      ...formData,
      categoryName: selectedCategory ? selectedCategory.name : "",
      categoryId: selectedCategory ? selectedCategory._id : "", // Update categoryId
    });
  };

  const handleColorChange = (index, color) => {
    const updatedColors = [...formData.colors];
    updatedColors[index].color = color;
    setFormData({ ...formData, colors: updatedColors });
  };

  const handleZoomImageChange = (index, zoomImage) => {
    const updatedColors = [...formData.colors];
    updatedColors[index].zoomImage = zoomImage;
    setFormData({ ...formData, colors: updatedColors });
  };
  const addColorPair = () => {
    setFormData({
      ...formData,
      colors: [...formData.colors, { color: "", zoomImage: "" }],
    });
  };
  const removeColorPair = (index) => {
    const updatedColors = formData.colors.filter((_, i) => i !== index);
    setFormData({ ...formData, colors: updatedColors });
  };

  const handleCompositionsChange = (selectedOption) => {
    // Update the category field and categoryId in formData with the selected category
    setFormData({
      ...formData,
      compositions: selectedOption.label,
    });
  };

  const handleAvailabilityChange = (selectedOption) => {
    // Update the category field and categoryId in formData with the selected category
    setFormData({
      ...formData,
      availability: selectedOption.label,
    });
  };

  const [editId, setEditedId] = useState();
  const [view, setView] = useState({
    add: false,
    category: false,
  });

  const sidebarRef = useRef(null);

  const toggle = (type) => {
    setView((prevState) => ({
      ...prevState,
      add: type === "add" ? !prevState.add : false,
      category: type === "category" ? !prevState.category : false,
    }));
  };

  const [currentModal, setCurrentModal] = useState(null);

  const openModal = (type) => {
    setCurrentModal(type);
  };

  const closeModalss = () => {
    setCurrentModal(null);
    resetForm();
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setView({
        add: false,
        categoryName: false,
      });
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Ensure actual_price and discount are numeric values
    const actualPrice = Number(formData.actual_price);
    const discountPercentage = Number(formData.discount);

    // Calculate the price after discount
    const discountedPrice = actualPrice - actualPrice * (discountPercentage / 100);

    // Ensure the calculated price is not less than 0
    const finalPrice = Math.max(discountedPrice, 0);

    // Update the formData with the calculated price
    setFormData((prevFormData) => ({
      ...prevFormData,
      price: finalPrice,
    }));
  }, [formData.actual_price, formData.discount]);

  const [onSearchText, setSearchText] = useState("");

  const [files, setFiles] = useState([]);
  // Pagination functions (not shown in the previous code)
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get current list for pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // function to close the form modal
  const onFormCancel = () => {
    setView({ edit: false, add: false, details: false });
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      imageSrc: "product_image_url_1.jpg",
      title: "",
      rating: "",
      sizes: ["S", "M", "L"],
      colors: [
        {
          color: "Red",
          zoomImage: "red_product_zoom_url.jpg",
        },
        {
          color: "Blue",
          zoomImage: "blue_product_zoom_url.jpg",
        },
      ],
      price: "",
      categoryId: "",
      categoryName: "",
      description: "",
      availability: "",
      quantity: 100,
      socialMedia: [
        {
          name: "Facebook",
          icon: "facebook_icon_url.png",
        },
        {
          name: "Twitter",
          icon: "twitter_icon_url.png",
        },
      ],
      compositions: "",
      styles: "Casual",
      properties: "Soft and comfortable",
      zoomImage: "product_zoom_image_url.jpg",
      image: "",
      productType: "Type 1",
    });
    reset({});
  };

  const [updateId, setUpdateId] = useState();

  const [catId, setCatId] = useState();
  // const [updateId, setUpdateId] = useState();
  // Function to convert tags array to a string representation
  const tagsToString = (tagsArray) => {
    return tagsArray.join(", ");
  };
  // function that loads the want to editted data
  const onEditClick = (_id) => {
    setUpdateId(_id);
    data.forEach((item) => {
      if (item._id === _id) {
        setFormData({
          imageSrc: item.imageSrc,
          title: item.title,
          rating: item.rating,
          sizes: item.sizes,
          colors: item.colors,
          price: item.price,
          categoryId: item.categoryId,
          categoryName: item.categoryName,
          description: item.description,
          availability: item.availability,
          quantity: 100,
          socialMedia: item.socialMedia,
          compositions: item.compositions,
          styles: item.styles,
          properties: item.properties,
          zoomImage: item.zoomImage,
          image: item.image,
          productType: item.productType,
        });
      }
    });
  };

  const onEditClickCat = (_id) => {
    setCatId(_id);
    categories.forEach((categories) => {
      if (categories._id === _id) {
        setCatFormData({
          name: categories.name,
          image: categories.image,
        });
      }
    });
  };

  useEffect(() => {
    reset(formData);
  }, [formData]);

  // selects all the products
  const selectorCheck = (e) => {
    let newData;
    newData = data.map((item) => {
      item.check = e.currentTarget.checked;
      return item;
    });
    setData([...newData]);
  };
  // selects one product
  const onSelectChange = (e, _id) => {
    let newData = data;
    let index = newData.findIndex((item) => item._id === _id);
    newData[index].check = e.currentTarget.checked;
    setData([...newData]);
  };
  // onChange function for searching name

  // function to delete a product
  const deleteProduct = async (_id) => {
    try {
      const result = await Swal.fire({
        title: "Confirm Deletion",
        text: "Are you sure you want to delete this Product?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const res = await axios.delete(`${serverAPI}services/${_id}`, {
          withCredentials: true,
        });
        if (res.status === 204) {
          Swal.fire("Deleted!", "The category has been deleted.", "success");
          setTimeout(() => {
            getProductdata();
          }, 1990);
        }
      }
    } catch (error) {
      console.error("Error adding the product:", error);
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
        getProductdata();
      }, 1990);
    }
  };
  // function to delete the seletected item
  const selectorDeleteProduct = () => {
    let newData;
    newData = data.filter((item) => item.check !== true);
    setData([...newData]);
  };
  // handles ondrop function of dropzone
  const cloudName = "dy4hpcssz";
  const uploadPreset = "ypfu9qmr"; // Replace with your upload preset

  const handleDropChanges = async (acceptedFiless) => {
    try {
      const caTformDataCopy = { ...catFormData }; // Use formDataCopy instead of formData
      const file = acceptedFiless[0];

      const formDataForCloudinary = new FormData(); // Use a different variable name
      formDataForCloudinary.append("file", file);
      formDataForCloudinary.append("upload_preset", uploadPreset);

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: "POST",
        body: formDataForCloudinary, // Use the formDataForCloudinary variable
      });

      const data = await response.json();

      const imageUrl = data.secure_url;
      caTformDataCopy.image = imageUrl;

      setCatFormData(caTformDataCopy);
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
    }
  };

  const handleDropChange = async (acceptedFiles) => {
    try {
      const formDataCopy = { ...formData }; // Use formDataCopy instead of formData
      const file = acceptedFiles[0];

      const formDataForCloudinary = new FormData(); // Use a different variable name
      formDataForCloudinary.append("file", file);
      formDataForCloudinary.append("upload_preset", uploadPreset);

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: "POST",
        body: formDataForCloudinary, // Use the formDataForCloudinary variable
      });

      const data = await response.json();

      const imageUrl = data.secure_url;
      formDataCopy.image = imageUrl;

      setFormData(formDataCopy);
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const handleAddProduct = async () => {
    const requiredFields = ["description"];

    const emptyFields = requiredFields.filter((field) => formData[field] === "");

    if (emptyFields.length > 0) {
      const missingFields = emptyFields.join(", ");
      toast.warn(`Please fill in the following fields: ${missingFields}`, {
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
        setLoading(true);
        // Your Axios API call to add the product goes here
        const response = await axios.post(`${serverAPI}products`, formData);

        // Once the product is successfully added, you might want to display a success message.
        if (response.status === 200) {
          toast.success("Product added successfully! 🥳", {
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
            resetForm();
            getProductdata();
          }, 1990);
        }
      } catch (error) {
        // If there's an error while adding the product, you can display an error message.
        console.error("Error adding the product:", error);

        toast.error("Error adding the product. Please try again later.", {
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

  const handleAddCategory = async () => {
    const requiredFields = ["name"];

    const emptyFields = requiredFields.filter((field) => catFormData[field] === "");

    if (emptyFields.length > 0) {
      const missingFields = emptyFields.join(", ");
      toast.warn(`Please fill in the following fields: ${missingFields}`, {
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
        setLoading(true);
        // Your Axios API call to add the product goes here
        const response = await axios.post(`${serverAPI}categories`, catFormData);

        // Once the product is successfully added, you might want to display a success message.
        if (response.status === 200) {
          toast.success("Categories added successfully! 🥳", {
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
            setCatFormData({ name: " " });
            resetForm();
            window.location.reload(false);
            getProductdata();
          }, 1990);
        }
      } catch (error) {
        // If there's an error while adding the product, you can display an error message.
        console.error("Error adding the product:", error);
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
          setCatFormData({ name: " " });
        }, 1990);
      }
    }
  };

  const [selectedProduct, setSelectedProduct] = useState(null); // New state to hold the selected product

  // const openDetailsModal = (product) => {
  //   // Function to open the details modal and set the selected product
  //   setSelectedProduct(product);
  //   setView((prevState) => ({ ...prevState, details: true }));
  // };

  const closeModals = () => {
    setSelectedProduct(null);
    setView((prevState) => ({ ...prevState, details: false, edit: false }));
  };

  const handleFormSubmit = async () => {
    try {
      const res = await axios.put(`${serverAPI}services/${updateId}`, formData);
      if (res.status === 200) {
        toast.success("Product update successfully! 🥳", {
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
          resetForm();
          window.location.reload(false);
          getProductdata();
        }, 1990);
      }
    } catch (error) {
      console.error("Error adding the product:", error);
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
        resetForm();
      }, 1990);
    }

    closeModalss();
  };
  const handleDelete = async (categoryId, categoriesName) => {
    try {
      const result = await Swal.fire({
        title: "Confirm Deletion",
        text: `Are you sure you want to delete this ${categoriesName}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const res = await axios.delete(`${serverAPI}categories/${categoryId}`);
        if (res.status === 200) {
          setCategories((prevCategories) => prevCategories.filter((category) => category._id !== categoryId));
          Swal.fire("Deleted!", "The category has been deleted.", "success");
          resetCatForm();
          resetsubForm();
        }
      }
    } catch (error) {
      console.error("Error adding the product:", error);
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
        getProductdata();
      }, 1990);
    }
  };

  const handelEditCat = async () => {
    try {
      const res = await axios.put(`${serverAPI}categories/${catId}`, catFormData);
      if (res.status === 200) {
        toast.success("Categories update successfully! 🥳", {
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
          resetCatForm();
          resetsubForm();
          resetForm();
          window.location.reload(false);
          getProductdata();
        }, 1990);
      }
    } catch (error) {
      console.error("Error adding the product:", error);
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
        resetForm();
      }, 1990);
    }

    closeModalss();
  };

  return (
    <React.Fragment>
      <Head title="Products"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle>Products</BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <a
                  href="#more"
                  className="btn btn-icon btn-trigger toggle-expand me-n1"
                  onClick={(ev) => {
                    ev.preventDefault();
                    updateSm(!sm);
                  }}
                >
                  <Icon name="more-v"></Icon>
                </a>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li className="nk-block-tools-opt">
                      <Button
                        className="toggle btn-icon d-md-none"
                        color="primary"
                        onClick={() => {
                          toggle("category");
                        }}
                      >
                        <Icon name="col-view"></Icon>
                        {/* <Icon name="plus"></Icon> */}
                      </Button>
                      <Button
                        className="toggle d-none d-md-inline-flex"
                        color="primary"
                        onClick={() => {
                          toggle("category");
                        }}
                      >
                        <Icon name="plus"></Icon>
                        <span>Add Category</span>
                      </Button>
                    </li>

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
                      <Button
                        className="toggle d-none d-md-inline-flex"
                        color="primary"
                        onClick={() => {
                          toggle("add");
                        }}
                      >
                        <Icon name="plus"></Icon>
                        <span>Add Product</span>
                      </Button>
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
                    id="uid_1"
                    onChange={(e) => selectorCheck(e)}
                  />
                  <label className="custom-control-label" htmlFor="uid_1"></label>
                </div>
              </DataTableRow>
              <DataTableRow size="sm">
                <span>Name</span>
              </DataTableRow>
              {/* <DataTableRow>
                <span>Actual Price</span>
              </DataTableRow>
              <DataTableRow>
                <span>Discount</span>
              </DataTableRow> */}
              <DataTableRow>
                <span>Price</span>
              </DataTableRow>
              {/* <DataTableRow>
                <span>Time</span>
              </DataTableRow> */}
              <DataTableRow size="md">
                <span>Category</span>
              </DataTableRow>

              <DataTableRow className="nk-tb-col-tools">
                <ul className="nk-tb-actions gx-1 my-n1">
                  <li className="me-n1">
                    <UncontrolledDropdown>
                      <DropdownToggle
                        tag="a"
                        href="#toggle"
                        onClick={(ev) => ev.preventDefault()}
                        className="dropdown-toggle btn btn-icon btn-trigger"
                      >
                        <Icon name="more-h"></Icon>
                      </DropdownToggle>
                      <DropdownMenu end>
                        <ul className="link-list-opt no-bdr">
                          <li>
                            <DropdownItem tag="a" href="#edit">
                              <Icon name="edit"></Icon>
                              <span>Edit Selected</span>
                            </DropdownItem>
                          </li>
                          <li>
                            <DropdownItem tag="a" href="#remove">
                              <Icon name="trash"></Icon>
                              <span>Remove Selected</span>
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
              ? currentItems.map((item) => {
                  return (
                    <DataTableItem key={item._id}>
                      <DataTableRow className="nk-tb-col-check">
                        <div className="custom-control custom-control-sm custom-checkbox notext">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            defaultChecked={item.check}
                            id={item._id}
                            key={Math.random()}
                            onChange={(e) => onSelectChange(e, item._id)}
                          />
                          <label className="custom-control-label" htmlFor={item._id}></label>
                        </div>
                      </DataTableRow>

                      <DataTableRow size="sm">
                        <span className="tb-product">
                          <img src={item.imageSrc} alt="product" className="thumb" />
                          <span className="title">{item.title}</span>
                        </span>
                      </DataTableRow>
                      {/* <DataTableRow>
                        <span className="tb-sub">₹ {item.actual_price}</span>
                      </DataTableRow>
                      <DataTableRow>
                        <span className="tb-sub">{item.discount} %</span>
                      </DataTableRow> */}
                      <DataTableRow>
                        <span className="tb-sub">₹ {item.price}</span>
                      </DataTableRow>
                      {/* <DataTableRow>
                        <span className="tb-sub">{item.time}</span>
                      </DataTableRow> */}
                      <DataTableRow size="md">
                        <span className="tb-sub">{item.categoryName}</span>
                      </DataTableRow>

                      <DataTableRow className="nk-tb-col-tools">
                        <ul className="nk-tb-actions gx-1 my-n1">
                          <li className="me-n1">
                            <UncontrolledDropdown>
                              <DropdownToggle
                                tag="a"
                                href="#more"
                                onClick={(ev) => ev.preventDefault()}
                                className="dropdown-toggle btn btn-icon btn-trigger"
                              >
                                <Icon name="more-h"></Icon>
                              </DropdownToggle>
                              <DropdownMenu end>
                                <ul className="link-list-opt no-bdr">
                                  <li>
                                    <DropdownItem
                                      tag="a"
                                      href="#edit"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                        onEditClick(item._id);
                                        openModal("edit");
                                      }}
                                    >
                                      <Icon name="edit"></Icon>
                                      <span>Edit Product</span>
                                    </DropdownItem>
                                  </li>

                                  <li>
                                    <DropdownItem
                                      tag="a"
                                      href="#remove"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                        deleteProduct(item._id);
                                      }}
                                    >
                                      <Icon name="trash"></Icon>
                                      <span>Remove Product</span>
                                    </DropdownItem>
                                  </li>
                                </ul>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </li>
                        </ul>
                      </DataTableRow>
                    </DataTableItem>
                  );
                })
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
                <span className="text-silent">No services found</span>
              </div>
            )}
          </PreviewAltCard>
        </Block>

        <Modal isOpen={currentModal === "edit"} toggle={closeModalss} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a href="#cancel" className="close">
              {" "}
              <Icon
                name="cross-sm"
                onClick={(ev) => {
                  ev.preventDefault();
                  closeModalss();
                }}
              ></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Update Product</h5>
              <div className="mt-4">
                <form>
                  <Row className="g-3">
                    <Col size="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="product-title">
                          Title
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col size="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="category">
                          Category
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="category"
                            isMulti={false}
                            options={categories.map((category) => ({ value: category._id, label: category.name }))}
                            onChange={handleCategoryChange}
                            value={
                              formData.categoryName
                                ? { value: formData.categoryName, label: formData.categoryName }
                                : null
                            }
                          />
                        </div>
                      </div>
                    </Col>
                    <Col size="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="product-title">
                          Compositions
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="compositions"
                            isMulti={false}
                            options={[
                              { value: "a", label: "clothings" },
                              { value: "b", label: "leathergoods" },
                            ]}
                            onChange={handleCompositionsChange}
                            value={
                              formData.compositions
                                ? { value: formData.compositions, label: formData.compositions }
                                : null
                            }
                          />
                        </div>
                      </div>
                    </Col>
                    <Col size="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="product-title">
                          Price (in ₹)
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            className="form-control"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col size="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="product-title">
                          Rating
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            className="form-control"
                            value={formData.rating}
                            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="regular-price">
                          Description
                        </label>
                        <div className="form-control-wrap">
                          <textarea
                            type="text"
                            className="form-control"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col size="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="product-title">
                          Availability
                        </label>

                        <div className="form-control-wrap">
                          <RSelect
                            name="availability"
                            isMulti={false}
                            options={[
                              { value: "a", label: "in stock" },
                              { value: "b", label: "out of stock" },
                            ]}
                            onChange={handleAvailabilityChange}
                            value={
                              formData.availability
                                ? { value: formData.availability, label: formData.availability }
                                : null
                            }
                          />
                        </div>
                      </div>
                    </Col>

                    {/* <Col size="12">
                        <Dropzone onDrop={(acceptedFiles) => handleDropChange(acceptedFiles)}>
                          {({ getRootProps, getInputProps }) => (
                            <section>
                              <div
                                {...getRootProps()}
                                className="dropzone upload-zone small bg-lighter my-2 dz-clickable"
                              >
                                <input {...getInputProps()} />
                                {formData.image ? (
                                  <div className="dz-preview dz-processing dz-image-preview dz-complete">
                                    <div className="dz-image">
                                      <img src={formData.image} alt="preview" />
                                    </div>
                                  </div>
                                ) : (
                                  <p>Drag 'n' drop some files here, or click to select files</p>
                                )}
                              </div>
                            </section>
                          )}
                        </Dropzone>
                      </Col> */}
                    <Col size="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="product-title">
                          Colors and Images
                        </label>
                        {formData.colors.map((colorPair, index) => (
                          <div
                            className="form-control-wrap"
                            style={{ display: "flex", marginBottom: "10px", gap: "5px" }}
                          >
                            <input
                              className="form-control"
                              type="text"
                              placeholder={`Color ${index + 1}`}
                              value={colorPair.color}
                              onChange={(e) => handleColorChange(index, e.target.value)}
                            />
                            <input
                              className="form-control"
                              type="text"
                              placeholder={`Zoom Image ${index + 1}`}
                              value={colorPair.zoomImage}
                              onChange={(e) => handleZoomImageChange(index, e.target.value)}
                            />
                            <button
                              style={{
                                padding: "4px 6px",
                                background: "#fff",
                                color: "Black",
                                fontFamily: "DM Sans, sans-serif",
                                fontWeight: "400",
                                borderRadius: "6px",
                                fontSize: "12px",
                                cursor: "pointer",
                              }}
                              type="button"
                              onClick={() => removeColorPair(index)}
                            >
                              X
                            </button>
                          </div>
                        ))}
                        <button
                          style={{
                            padding: "4px 6px",
                            background: "#fff",
                            color: "Black",
                            fontFamily: "DM Sans, sans-serif",
                            fontWeight: "400",
                            borderRadius: "6px",
                            fontSize: "12px",
                            cursor: "pointer",
                          }}
                          type="button"
                          onClick={addColorPair}
                        >
                          Add Another color image pair
                        </button>
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
                        onClick={handleAddProduct}
                      >
                        {loading ? <Spinner size="sm" color="light" /> : "Add Product"}
                      </a>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </ModalBody>
        </Modal>

        <Modal isOpen={currentModal === "editCat"} toggle={closeModalss} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a href="#cancel" className="close">
              {" "}
              <Icon
                name="cross-sm"
                onClick={(ev) => {
                  ev.preventDefault();
                  closeModalss();
                }}
              ></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Edit Category</h5>
              <div className="mt-4">
                <form>
                  <Row className="g-3">
                    <Col size="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="product-title">
                          Category Name
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            value={catFormData.name}
                            onChange={(e) => setCatFormData({ ...catFormData, name: e.target.value })}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col size="12">
                      <Dropzone onDrop={(acceptedFiless) => handleDropChanges(acceptedFiless)}>
                        {({ getRootProps, getInputProps }) => (
                          <section>
                            <div
                              {...getRootProps()}
                              className="dropzone upload-zone small bg-lighter my-2 dz-clickable"
                            >
                              <input {...getInputProps()} />
                              {catFormData.image ? (
                                <div className="dz-preview dz-processing dz-image-preview dz-complete">
                                  <div className="dz-image">
                                    <img src={catFormData.image} alt="preview" />
                                  </div>
                                </div>
                              ) : (
                                <p>Drag 'n' drop some files here, or click to select files</p>
                              )}
                            </div>
                          </section>
                        )}
                      </Dropzone>
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
                        onClick={handelEditCat}
                      >
                        {loading ? <Spinner size="sm" color="light" /> : "Update Category"}
                      </a>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </ModalBody>
        </Modal>

        <div ref={sidebarRef}>
          <SimpleBar
            className={`nk-add-product toggle-slide toggle-slide-right toggle-screen-any ${
              view.add || view.category ? "content-active" : ""
            }`}
            style={{ width: "500px" }}
          >
            {view.category && (
              <>
                <BlockHead>
                  <BlockHeadContent>
                    <BlockTitle tag="h5">Add Category</BlockTitle>
                    <BlockDes>
                      <p>Add information and update Category.</p>
                    </BlockDes>
                  </BlockHeadContent>
                </BlockHead>
                {/* Add Category form inputs */}
                <Block>
                  <form>
                    <Row className="g-3">
                      <Col size="12">
                        <div className="form-group">
                          <label className="form-label" htmlFor="product-title">
                            Category Name
                          </label>
                          <div className="form-control-wrap">
                            <input
                              type="text"
                              className="form-control"
                              value={catFormData.name}
                              onChange={(e) => setCatFormData({ ...catFormData, name: e.target.value })}
                            />
                          </div>
                        </div>
                      </Col>
                      <Col size="12">
                        <Dropzone onDrop={(acceptedFiless) => handleDropChanges(acceptedFiless)}>
                          {({ getRootProps, getInputProps }) => (
                            <section>
                              <div
                                {...getRootProps()}
                                className="dropzone upload-zone small bg-lighter my-2 dz-clickable"
                              >
                                <input {...getInputProps()} />
                                {catFormData.image ? (
                                  <div className="dz-preview dz-processing dz-image-preview dz-complete">
                                    <div className="dz-image">
                                      <img src={catFormData.image} alt="preview" />
                                    </div>
                                  </div>
                                ) : (
                                  <p>Drag 'n' drop some files here, or click to select files</p>
                                )}
                              </div>
                            </section>
                          )}
                        </Dropzone>
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
                          onClick={handleAddCategory}
                        >
                          {loading ? <Spinner size="sm" color="light" /> : "Add Category"}
                        </a>
                      </Col>
                    </Row>
                  </form>
                </Block>
                <Block>
                  <BlockHead>
                    <BlockHeadContent>
                      <BlockTitle tag="h5">Category List</BlockTitle>
                    </BlockHeadContent>
                  </BlockHead>
                  {categories.map((categories) => (
                    <Row className="g-3" key={categories._id}>
                      <Col size="6">
                        <div className="form-group">
                          <small className="text-primary" style={{ fontSize: "15px" }}>
                            {categories.name}
                          </small>
                        </div>
                      </Col>
                      <Col size="1">
                        <div className="form-group">
                          <div
                            className="form-control-wrap"
                            onClick={() => handleDelete(categories._id, categories.name)}
                          >
                            <Icon name="trash-alt" style={{ fontSize: "17px", color: "red", cursor: "pointer" }} />
                          </div>
                        </div>
                      </Col>

                      <Col size="1">
                        <div className="form-group">
                          <div
                            className="form-control-wrap"
                            onClick={(ev) => {
                              ev.preventDefault();
                              onEditClickCat(categories._id);
                              openModal("editCat"); // Pass the product data to openDetailsModal
                            }}
                          >
                            <Icon name="edit" style={{ fontSize: "17px", color: "blue" }} />
                          </div>
                        </div>
                      </Col>
                    </Row>
                  ))}
                </Block>
              </>
            )}

            {view.add && !view.category && (
              <>
                <BlockHead>
                  <BlockHeadContent>
                    <BlockTitle tag="h5">Add Product</BlockTitle>
                    <BlockDes>
                      <p>Add information or update product.</p>
                    </BlockDes>
                  </BlockHeadContent>
                </BlockHead>
                <Block>
                  <form>
                    <Row className="g-3">
                      <Col size="12">
                        <div className="form-group">
                          <label className="form-label" htmlFor="product-title">
                            Title
                          </label>
                          <div className="form-control-wrap">
                            <input
                              type="text"
                              className="form-control"
                              value={formData.title}
                              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                          </div>
                        </div>
                      </Col>
                      <Col size="12">
                        <div className="form-group">
                          <label className="form-label" htmlFor="category">
                            Category
                          </label>
                          <div className="form-control-wrap">
                            <RSelect
                              name="category"
                              isMulti={false}
                              options={categories.map((category) => ({ value: category._id, label: category.name }))}
                              onChange={handleCategoryChange}
                              value={
                                formData.categoryName
                                  ? { value: formData.categoryName, label: formData.categoryName }
                                  : null
                              }
                            />
                          </div>
                        </div>
                      </Col>
                      <Col size="12">
                        <div className="form-group">
                          <label className="form-label" htmlFor="product-title">
                            Compositions
                          </label>
                          <div className="form-control-wrap">
                            <RSelect
                              name="compositions"
                              isMulti={false}
                              options={[
                                { value: "a", label: "clothings" },
                                { value: "b", label: "leathergoods" },
                              ]}
                              onChange={handleCompositionsChange}
                              value={
                                formData.compositions
                                  ? { value: formData.compositions, label: formData.compositions }
                                  : null
                              }
                            />
                          </div>
                        </div>
                      </Col>
                      <Col size="12">
                        <div className="form-group">
                          <label className="form-label" htmlFor="product-title">
                            Price (in ₹)
                          </label>
                          <div className="form-control-wrap">
                            <input
                              type="number"
                              className="form-control"
                              value={formData.price}
                              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            />
                          </div>
                        </div>
                      </Col>
                      <Col size="12">
                        <div className="form-group">
                          <label className="form-label" htmlFor="product-title">
                            Rating
                          </label>
                          <div className="form-control-wrap">
                            <input
                              type="number"
                              className="form-control"
                              value={formData.rating}
                              onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                            />
                          </div>
                        </div>
                      </Col>
                      <Col md="12">
                        <div className="form-group">
                          <label className="form-label" htmlFor="regular-price">
                            Description
                          </label>
                          <div className="form-control-wrap">
                            <textarea
                              type="text"
                              className="form-control"
                              value={formData.description}
                              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                          </div>
                        </div>
                      </Col>
                      <Col size="12">
                        <div className="form-group">
                          <label className="form-label" htmlFor="product-title">
                            Availability
                          </label>

                          <div className="form-control-wrap">
                            <RSelect
                              name="availability"
                              isMulti={false}
                              options={[
                                { value: "a", label: "in stock" },
                                { value: "b", label: "out of stock" },
                              ]}
                              onChange={handleAvailabilityChange}
                              value={
                                formData.availability
                                  ? { value: formData.availability, label: formData.availability }
                                  : null
                              }
                            />
                          </div>
                        </div>
                      </Col>

                      {/* <Col size="12">
                        <Dropzone onDrop={(acceptedFiles) => handleDropChange(acceptedFiles)}>
                          {({ getRootProps, getInputProps }) => (
                            <section>
                              <div
                                {...getRootProps()}
                                className="dropzone upload-zone small bg-lighter my-2 dz-clickable"
                              >
                                <input {...getInputProps()} />
                                {formData.image ? (
                                  <div className="dz-preview dz-processing dz-image-preview dz-complete">
                                    <div className="dz-image">
                                      <img src={formData.image} alt="preview" />
                                    </div>
                                  </div>
                                ) : (
                                  <p>Drag 'n' drop some files here, or click to select files</p>
                                )}
                              </div>
                            </section>
                          )}
                        </Dropzone>
                      </Col> */}
                      <Col size="12">
                        <div className="form-group">
                          <label className="form-label" htmlFor="product-title">
                            Colors and Images
                          </label>
                          {formData.colors.map((colorPair, index) => (
                            <div
                              className="form-control-wrap"
                              style={{ display: "flex", marginBottom: "10px", gap: "5px" }}
                            >
                              <input
                                className="form-control"
                                type="text"
                                placeholder={`Color ${index + 1}`}
                                value={colorPair.color}
                                onChange={(e) => handleColorChange(index, e.target.value)}
                              />
                              <input
                                className="form-control"
                                type="text"
                                placeholder={`Zoom Image ${index + 1}`}
                                value={colorPair.zoomImage}
                                onChange={(e) => handleZoomImageChange(index, e.target.value)}
                              />
                              <button
                                style={{
                                  padding: "4px 6px",
                                  background: "#fff",
                                  color: "Black",
                                  fontFamily: "DM Sans, sans-serif",
                                  fontWeight: "400",
                                  borderRadius: "6px",
                                  fontSize: "12px",
                                  cursor: "pointer",
                                }}
                                type="button"
                                onClick={() => removeColorPair(index)}
                              >
                                X
                              </button>
                            </div>
                          ))}
                          <button
                            style={{
                              padding: "4px 6px",
                              background: "#fff",
                              color: "Black",
                              fontFamily: "DM Sans, sans-serif",
                              fontWeight: "400",
                              borderRadius: "6px",
                              fontSize: "12px",
                              cursor: "pointer",
                            }}
                            type="button"
                            onClick={addColorPair}
                          >
                            Add Another color image pair
                          </button>
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
                          onClick={handleAddProduct}
                        >
                          {loading ? <Spinner size="sm" color="light" /> : "Add Product"}
                        </a>
                      </Col>
                    </Row>
                  </form>
                </Block>
              </>
            )}
            {/* Add Product Form */}
          </SimpleBar>
        </div>
      </Content>
      <ToastContainer />
    </React.Fragment>
  );
};

export default ProductList;
