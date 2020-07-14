import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { observer } from "mobx-react-lite";
import { StoreContext } from "../../store/rootStore";

interface IProps {
  path: string;
  exact: boolean;
}

const PrivateRoute: React.FC<IProps> = ({ path, exact, children }) => {
  const Store = useContext(StoreContext);
  const { isLoggedIn } = Store.userStore;

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Route path={path} exact={exact}>
      {children}
    </Route>
  );
};

export default observer(PrivateRoute);
