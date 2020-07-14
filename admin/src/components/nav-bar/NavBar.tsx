import React from "react";
import { NavLink, withRouter } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <NavLink to="/">Home</NavLink> {" | "}
      <NavLink to="/articles">Articles</NavLink> {" | "}
      <NavLink to="/categories">Categories</NavLink> {" | "}
      <NavLink to="/users">Users</NavLink>
    </div>
  );
};

export default withRouter(NavBar);
