import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";

const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalAmount = () => {
    let amount = 0;
    products?.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <button className="btn btn-success">Proceed to pay</button>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin required</button>
      </Link>
    );
  };

  return (
    <div>
      <h3 className="text-white m-4">Total Price: $ {getFinalAmount()}</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
