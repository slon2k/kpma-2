import React, { useContext } from "react";
import LoginForm from "../components/login-form";
import { StoreContext } from "../store/rootStore";
import { Redirect } from "react-router-dom";
import { observer } from "mobx-react-lite";

const HomePage: React.FC = () => {
  const context = useContext(StoreContext);
  const { isLoggedIn } = context.userStore;

  if (isLoggedIn) {
    return <Redirect to={"/articles"} />;
  }

  return (
    <div style={{ margin: 100 }}>
      <LoginForm />
    </div>
  );
};

export default observer(HomePage);
