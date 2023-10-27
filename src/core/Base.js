import "../styles.css";
import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "My description",
  className = "",
  children,
}) => (
  <div className="base-container">
    <Menu />
    <div className="main-content">
      <div className="jumbotron text-center jumbotron-container">
        <h2 className="display-4 font-weight-bold">{title}</h2>
        <p className="lead font-weight-bold">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <footer className="footer mt-auto py-3 footer-container">
      <div className="container-fluid text-white text-center py-3">
        <h4>For any queries reach out to us here</h4>
        <a
          href="mailto:ayushydv012@gmail.com"
          className="btn btn-warning btn-md m-2"
        >
          Contact Us
        </a>
      </div>
    </footer>
  </div>
);

export default Base;
