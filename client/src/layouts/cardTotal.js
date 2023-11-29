import React from "react";
import { useSelector } from "react-redux";

const CardTotal = ({
  products,
  shippingCostThreshold,
  shippingCost,
  calculateSubtotal,
  calculateTotal,
  shippingFee,
  calculateTotalGST,
}) => {
  const discount = useSelector((state) => state.discount);
  console.log("subtotal", calculateSubtotal);
  console.log("total gst", calculateTotalGST);

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
                {product.title} (X {product.quantiti})
                <span>
                  ₹
                  {parseFloat(product.price.replace("$", "")) *
                    product.quantiti}
                </span>
              </li>
            ))}
          </ul>
          <p>
            Sub Total <span>₹{calculateSubtotal}</span>
          </p>
          <p>
            Shipping Fee <span>₹{shippingFee}</span>
          </p>
          <p>
            Discount <span>₹{discount.toFixed(2)}</span>
          </p>
          <p>
            GST <span>₹{calculateTotalGST}</span>
          </p>
          <h4>
            Grand Total <span>₹{calculateTotal.toFixed(2)}</span>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default CardTotal;
