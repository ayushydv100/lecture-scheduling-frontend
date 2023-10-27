import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../../src/backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = () => {
    return (
      <div className="m-4 col-6 mb-4 custom-style">
        <h2 className="text-white mb-4">Products in cart:</h2>
        {products?.map((product, index) => (
          <div key={index} className="mb-4">
            <Card
              product={product}
              removeFromCart={true}
              addToCartButton={false}
              setReload={setReload}
              reload={reload}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row text-center pb-4 custom-style">
        <div className="col-6 d-flex align-items-center justify-content-center">
          {loadAllProducts()}
        </div>
        <div className="col-6">
          <StripeCheckout products={products} setReload={setReload} />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
