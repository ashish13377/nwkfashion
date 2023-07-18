import React from "react";
import { useSelector } from "react-redux";

const CardTotal = ({
  products,
  shippingCost,
  calculateSubtotal,
  calculateTotal,
}) => {
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
            Sub Total <span>${calculateSubtotal}</span>
          </p>
          <p>
            Shipping Fee <span>${shippingCost}</span>
          </p>
          <h4>
            Grand Total <span>${calculateTotal}</span>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default CardTotal;
