import React from "react";
import { useSelector } from "react-redux";

const CardTotal = ({ products }) => {
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

  return (
    <div>
      <div className="col-12 mb-40">
        <h4 className="checkout-title">Cart Total</h4>
        <div className="checkout-cart-total">
          <h4>
            Product <span>Total</span>
          </h4>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                {product.title}
                <span>${parseFloat(product.price.replace("$", ""))}</span>
              </li>
            ))}
          </ul>
          <p>
            Sub Total <span>${calculateSubtotal()}</span>
          </p>
          <p>
            Shipping Fee{" "}
            <span>
              ${calculateSubtotal() >= shippingCostThreshold ? 0 : shippingCost}
            </span>
          </p>
          <p>
            GST{" "}
            <span>
              ${calculateTotal() - calculateSubtotal() - shippingCost}
            </span>
          </p>
          <h4>
            Grand Total <span>${calculateTotal()}</span>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default CardTotal;
