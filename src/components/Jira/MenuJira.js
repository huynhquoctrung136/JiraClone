/** @format */

import React from "react";
import { NavLink } from "react-router-dom";
export default function MenuJira() {
  return (
    <div className="menu">
      <div className="account">
        <div className="avatar">
          <img src="/assets/img/download.jfif" alt="logo" />
        </div>
        <div className="account-info">
          <p>CyberLearn.vn</p>
          <p>Report bugs</p>
        </div>
      </div>
      <div className="control">
        <div>
          <i className="fa fa-eye mr-3" />
          <NavLink
            to="/projectmanagement"
            className="text-dark"
            activeClassName="active font-weight-bold"
            style={{ textDecoration: "none" }}
          >
            Project Management
          </NavLink>
        </div>
        <div>
          <i className="fa fa-cog mr-3" />
          <NavLink
            to="/createproject"
            className="text-dark"
            activeClassName="active font-weight-bold"
            style={{ textDecoration: "none" }}
          >
            Create Project
          </NavLink>
        </div>
      </div>
      <div className="feature">
        <div>
          <i className="fa fa-truck mr-3" />
          <span>Releases</span>
        </div>
        <div>
          <i className="fa fa-equals mr-3" />
          <span>Issues and filters</span>
        </div>
        <div>
          <i className="fa fa-paste mr-3" />
          <span>Pages</span>
        </div>
        <div>
          <i className="fa fa-location-arrow mr-3" />
          <span>Reports</span>
        </div>
        <div>
          <i className="fa fa-box mr-3" />
          <span>Components</span>
        </div>
      </div>
    </div>
  );
}
