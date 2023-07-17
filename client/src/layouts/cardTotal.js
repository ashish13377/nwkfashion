import React from "react";
import { useSelector } from "react-redux";

const CardTotal = () => {
  const products = useSelector((state) => state.cart.products);

  const calculateSubtotal = () => {
    let subtotal = 0;

    products.forEach((product) => {
      const price = parseFloat(product.price.replace("$", ""));

      subtotal += price;
    });

    return subtotal;
  };

  const shippingCost = 10;

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    // Replace with your shipping cost calculation

    return subtotal + shippingCost;
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
            Shipping Fee <span>${shippingCost}</span>
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
