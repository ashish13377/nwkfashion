import React, { useState, useEffect } from "react";
import BillingAddress from "./billingAddress";
import CardTotal from "./cardTotal";
import PaymentMethod from "./paymentMethod";
import { useSelector } from "react-redux";

const CheckoutComponent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const products = useSelector((state) => state.cart.products);
  const [formData, setFormData] = useState({
    razorpay: null,
    address: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      phoneNo: "",
      address: "",
      country: "",
      townCity: "",
      state: "",
      zipCode: "",
    },
    paymentMethod: "",
    userId: user ? user._id : "",
    productID: [],
    productDetails: [], // Initialize productDetails as an empty array
    totalPrice: ""
  });

  console.log(formData);

  useEffect(() => {
    const productIDs = products.map((product) => product._id);
    const productDetails = products.map((product) => ({
      productID: product._id,
      name: product.name,
      price: product.price,
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      productID: productIDs,
      productDetails: productDetails,
    }));
  }, [products]);

  const handleChange = (fieldName, value) => {
    // If the fieldName contains a dot (.), it means it's a nested field
    // We need to update the nested state appropriately
    if (fieldName.includes(".")) {
      const [parentField, nestedField] = fieldName.split(".");
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [parentField]: {
            ...formData.address[parentField],
            [nestedField]: value,
          },
        },
      });
    } else {
      // If it's not a nested field, directly update the state
      setFormData({
        ...formData,
        [fieldName]: value,
      });
    }

    // Set the orderDetails in formData's razorpay key
  };

  

  // console.log(formData);

  const shippingCostThreshold = 1000; // The order total above which free shipping is applicable
  const shippingCost = 100; // Flat shipping cost for orders below the shippingCostThreshold

  // GST percentages for different categories
  const gstPercentages = {
    clothing: 5,
    leather_goods: 18,
  };

  const calculateSubtotal = () => {
    let subtotal = 0;

    products.forEach((product) => {
      const price = parseFloat(product.price.replace("$", ""));
      subtotal += price;
    });

    return subtotal;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    // Calculate shipping cost based on the order total
    const shippingFee = subtotal >= shippingCostThreshold ? 0 : shippingCost;

    // Calculate GST based on the category of products
    let totalGST = 0;
    products.forEach((product) => {
      const productType = product.productType;
      if (gstPercentages.hasOwnProperty(productType)) {
        const gstPercentage = gstPercentages[productType];
        const price = parseFloat(product.price.replace("$", ""));
        const gst = (price * gstPercentage) / 100;
        totalGST += gst;
      }
    });
    return subtotal + shippingFee + totalGST;
  };

  const handleOrderDetailsChange = (orderDetails) => {
    // Set the orderDetails in formData's razorpay key
    setFormData({
      ...formData,
      razorpay: orderDetails,
      totalPrice: calculateTotal()
    });
  };
  return (
    <div>
      <div>
        <div className="page-section section section-padding">
          <div className="container">
            {/* Checkout Form s*/}
            <form action="#" className="checkout-form">
              <div className="row row-50 mbn-40">
                <BillingAddress
                  formData={formData}
                  onFormDataChange={handleChange}
                />
                <div className="col-lg-5">
                  <div className="row">
                    {/* Cart Total */}
                    <CardTotal
                      products={products}
                      shippingCostThreshold={shippingCostThreshold}
                      shippingCost={shippingCost}
                      calculateSubtotal={calculateSubtotal()}
                      calculateTotal={calculateTotal()}
                    />
                    {/* Payment Method */}

                    <PaymentMethod
                      formData={formData}
                      products={products}
                      onFormDataChange={handleChange}
                      onOrderDetailsChange={handleOrderDetailsChange}
                      shippingCost={shippingCost}
                      calculateSubtotal={calculateSubtotal()}
                      calculateTotal={calculateTotal()}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      ;
    </div>
  );
};

export default CheckoutComponent;
