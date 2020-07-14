import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

type Params = {
  id: string;
};

const UserDetailsPage: React.FC<RouteComponentProps<Params>> = ({ match }) => {
  const { id: UserId } = match.params;

  return (
    <div>
      <h2>User details</h2>
      <h3>User ID: {UserId}</h3>
    </div>
  );
};

export default withRouter(UserDetailsPage);
