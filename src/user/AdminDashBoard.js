// AdminDashboard.js

import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
import "../styles.css"; // Import the external CSS file

const AdminDashBoard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header card-header-admin">Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link
              to="/admin/create/instructer"
              className="nav-link nav-link-admin"
            >
              Add Instructer
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/course" className="nav-link nav-link-admin">
              Add Course
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to="/admin/create/lecture"
              className="nav-link nav-link-admin"
            >
              Add Lecture
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header card-header-admin">Admin Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <p>
              <span className="badge admin-badge mr-2">Name:</span>
              {name}
            </p>
          </li>
          <li className="list-group-item">
            <p>
              <span className="badge admin-badge mr-2">Email:</span>
              {email}
            </p>
          </li>
          <li className="list-group-item">
            <span className="badge badge-danger p-2 admin-badge text-white">
              Admin Area
            </span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Admin area"
      description="Manage everything here"
      className="container p-4 admin-container"
    >
      <div className="row p-4 admin-container">
        <div className="col-3">{adminLeftSide()}</div>
        <div className="col-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
