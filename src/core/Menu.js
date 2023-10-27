import "../styles.css";
import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";

const currentTab = (history, path) => {
  if (history?.location?.pathname === path) {
    return "menu-link-selected";
  } else {
    return "menu-link";
  }
};

const Menu = ({ history }) => (
  <div>
    <ul className="nav nav-tabs font-weight-bold menu-background">
      <li className="nav-item">
        <Link className={`nav-link ${currentTab(history, "/")}`} to="/">
          Home
        </Link>
      </li>
      {isAuthenticated() && isAuthenticated().user?.role === 0 && <li></li>}
      {isAuthenticated() && isAuthenticated().user?.role === 1 && (
        <li className="nav-item">
          <Link
            className={`nav-link ${currentTab(history, "/admin/dashboard")}`}
            to="/admin/dashboard"
          >
            A. Dashboard
          </Link>
        </li>
      )}
      {!isAuthenticated() && (
        <Fragment>
          <li className="nav-item">
            <Link
              className={`nav-link ${currentTab(history, "/signup")}`}
              to="/signup"
            >
              Sign Up
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${currentTab(history, "/signin")}`}
              to="/signin"
            >
              Sign In
            </Link>
          </li>
        </Fragment>
      )}
      {isAuthenticated() && (
        <li className="nav-item">
          <span
            className="nav-link text-warning"
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            Signout
          </span>
        </li>
      )}
    </ul>
  </div>
);

export default withRouter(Menu);
