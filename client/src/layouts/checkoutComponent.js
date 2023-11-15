import React, { useState, useEffect } from "react";
import BillingAddress from "./billingAddress";
import CardTotal from "./cardTotal";
import PaymentMethod from "./paymentMethod";
import { useSelector } from "react-redux";

const CheckoutComponent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = useSelector((state) => state.cart.userId);
  const products = useSelector(
    (state) =>
      state.cart.products.filter((product) => product.userId === userId) // Filter products based on userId
  );

  const selectSelectedDressInfo = (state) =>
    state.selectedDress.selectedDressData;

  const selectedDressInfo = useSelector(selectSelectedDressInfo);
  console.log(selectedDressInfo);

  const [formData, setFormData] = useState({
    razorpay: "",
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
    totalPrice: "",
    subTotal: "",
    shippingFee: "",
    gst: "",
  });

  useEffect(() => {
    const productIDs = products.map((product) => product._id);
    const productDetails = products.map((product) => ({
      productID: product._id,
      name: product.title,
      price: product.price,
      quantiti: product.quantiti,
      selectedDressInfo: selectedDressInfo,
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      productID: productIDs,
      productDetails: productDetails,
      totalPrice: calculateTotal(),
      subTotal: calculateSubtotal(),
      shippingFee: shippingFee,
      gst: calculateTotalGST(),
    }));
  }, []);

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

  console.log("form data111", formData);

  const shippingCostThreshold = 1000; // The order total above which free shipping is applicable
  const shippingCost = 100; // Flat shipping cost for orders below the shippingCostThreshold

  // GST percentages for different categories
  const calculateShippingCost = (subtotal) => {
    if (subtotal >= shippingCostThreshold) {
      return 0; // Free shipping for orders 1k or above
    } else {
      return shippingCost; // Rs.100 flat shipping for orders below 1k
    }
  };

  const gstPercentages = {
    clothings: 5,
    leathergoods: 18,
  };

  const calculateSubtotal = () => {
    let subtotal = 0;

    products.forEach((product) => {
      const price = product.price * product.quantiti;
      subtotal += price;
    });

    return subtotal;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shippingCost = calculateShippingCost(subtotal);

    let totalGST = 0;
    products.forEach((product) => {
      const compositions = product.compositions;
      if (gstPercentages.hasOwnProperty(compositions)) {
        const price = product.price * product.quantiti;
        const gstPercentage = gstPercentages[compositions];

        totalGST += (price * gstPercentage) / 100;
      }
    });

    return subtotal + shippingCost + totalGST;
  };

  const calculateTotalGST = () => {
    let totalGST = 0;

    products.forEach((product) => {
      const compositions = product.compositions;

      console.log("compositions:", gstPercentages.hasOwnProperty(compositions));

      if (gstPercentages.hasOwnProperty(compositions)) {
        const price = product.price * product.quantiti;

        const gstPercentage = gstPercentages[compositions];

        totalGST += (price * gstPercentage) / 100;
      }
    });

    console.log("totalGST:", totalGST);
    return totalGST;
  };

  const handleOrderDetailsChange = (orderDetails) => {
    // Set the orderDetails in formData's razorpay key
    const updatedFormData = { ...formData, razorpay: orderDetails };
    setFormData(updatedFormData);
  };

  const shippingFee =
    calculateSubtotal() >= shippingCostThreshold ? 0 : calculateShippingCost();
  // console.log("total gstttt", calculateTotalGST());
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
                      shippingFee={shippingFee}
                      calculateTotalGST={calculateTotalGST()}
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
