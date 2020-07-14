import React, { useContext, useState, SyntheticEvent } from "react";
import { StoreContext } from "../../store/rootStore";
import { withRouter, RouteComponentProps } from "react-router-dom";

const LoginForm: React.FC<RouteComponentProps> = ({ history }) => {
  const context = useContext(StoreContext);
  const { login } = context.userStore;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("submitting", { email, password });
    login({ email, password }).then(() => history.push("/articles"));
  };

  return (
    <form>
      <input
        type="email"
        placeholder="Email"
        value={email}
        name="Email"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        name="Password"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />
      <br />
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
};

export default withRouter(LoginForm);
