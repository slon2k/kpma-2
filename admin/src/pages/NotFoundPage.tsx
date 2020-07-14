import React from "react";
import { NavLink } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div style={{ padding: 50 }}>
      <h1>Page not found</h1>
      <NavLink to={`/articles`}>Return to articles</NavLink>
    </div>
  );
};

export default NotFoundPage;
