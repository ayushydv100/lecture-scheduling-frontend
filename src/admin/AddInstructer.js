import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createInstructer } from "./helper/adminapicall";

const AddInstructer = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const goBack = () => (
    <div className="">
      <Link className="btn mb-3 btn-outline-info " to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    createInstructer(user._id, token, { name }).then((data) => {
      if (data && data.error) {
        setError(true);
      } else {
        setError(false);
        setSuccess(true);
        setName("");
      }
    });
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Instructer Added successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-warning">Failed to add Instructer</h4>;
    }
  };

  const myInstructerForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">
          <input
            type="text"
            className="form-control my-3"
            onChange={handleChange}
            value={name}
            autoFocus
            required
            placeholder="For ex. Eren"
          />
          <button onClick={onSubmit} className="btn text-white light-bg">
            Add Instructer
          </button>
        </p>
      </div>
    </form>
  );

  return (
    <Base
      title="Add Instructer"
      description="Add a new Instructer here"
      className="container p-4"
      // style={{ backgroundColor: "#40514E", width: "100%" }}
    >
      <div className="container-fluid">
        {" "}
        {/* Use container-fluid to extend the full width */}
        <div className="row p-2 rounded dark-bg">
          <div className="col-md-8 offset-md-2">
            {successMessage()}
            {warningMessage()}
            {myInstructerForm()}
            {goBack()}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default AddInstructer;
