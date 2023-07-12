import React, { useState } from "react";
const CartTable = () => {
  const initialProducts = [
    {
      id: 1,
      imageSrc: "assets/images/product/product-1.jpg",
      title: "Tmart Baby Dress",
      price: "$25",
      quantity: 1,
      subtotal: "$25",
    },
    {
      id: 2,
      imageSrc: "assets/images/product/product-2.jpg",
      title: "Jumpsuit Outfits",
      price: "$09",
      quantity: 1,
      subtotal: "$09",
    },
  ];

  const [products, setProducts] = useState(initialProducts);

  const handleRemove = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  return (
    <div className="page-section section section-padding">
      <div className="container">
        <form action="#">
          <div className="row mbn-40">
            <div className="col-12 mb-40">
              <div className="cart-table table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th className="pro-thumbnail">Image</th>
                      <th className="pro-title">Product</th>
                      <th className="pro-price">Price</th>
                      <th className="pro-quantity">Quantity</th>
                      <th className="pro-subtotal">Total</th>
                      <th className="pro-remove">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td className="pro-thumbnail">
                          <a href="/">
                            <img src={product.imageSrc} alt="" />
                          </a>
                        </td>
                        <td className="pro-title">
                          <a href="/">{product.title}</a>
                        </td>
                        <td className="pro-price">
                          <span className="amount">{product.price}</span>
                        </td>
                        <td className="pro-quantity">
                          <div className="pro-qty">
                            <input
                              type="text"
                              defaultValue={product.quantity}
                            />
                          </div>
                        </td>
                        <td className="pro-subtotal">{product.subtotal}</td>
                        <td className="pro-remove">
                          <a href="/" onClick={() => handleRemove(product.id)}>
                            ×
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-lg-8 col-md-7 col-12 mb-40">
              <div className="cart-buttons mb-30">
                <a href="/">Continue Shopping</a>
              </div>
              {/* <div className="cart-coupon">
                <h4>Coupon</h4>
                <p>Enter your coupon code if you have one.</p>
                
                <div className="cuppon-form">
                  <input type="text" placeholder="Coupon code" />
                  <input type="submit" defaultValue="Apply Coupon" />
                </div>
              </div> */}
            </div>
            <div className="col-lg-4 col-md-5 col-12 mb-40">
              <div className="cart-total fix">
                <h3>Cart Totals</h3>
                <table>
                  <tbody>
                    <tr className="cart-subtotal">
                      <th>Subtotal</th>
                      <td>
                        <span className="amount">$306.00</span>
                      </td>
                    </tr>
                    <tr className="order-total">
                      <th>Total</th>
                      <td>
                        <strong>
                          <span className="amount">$306.00</span>
                        </strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="proceed-to-checkout section mt-30">
                  <a href="/">Proceed to Checkout</a>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CartTable;
