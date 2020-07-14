import React, { useContext, useEffect } from "react";
import styles from "./App.module.scss";
import { Switch, Route } from "react-router-dom";
import { observer } from "mobx-react-lite";
import {
  HomePage,
  CategoryListPage,
  ArticleListPage,
  ImageListPage,
  UserListPage,
  ArticleDetailsPage,
  CategoryDetailsPage,
  ImageDetailsPage,
  UserDetailsPage,
  NotFoundPage,
  CategoryCreatePage,
  ArticleCreatePage,
} from "../../pages";
import NavBar from "../nav-bar";
import { StoreContext } from "../../store/rootStore";
import PrivateRoute from "../private-route";

const App: React.FC = () => {
  const context = useContext(StoreContext);
  const { appLoaded, setAppLoaded, token } = context.appStore;
  const { getUser, user, isLoggedIn, logout } = context.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [token, getUser, setAppLoaded]);

  if (!appLoaded) {
    return <div>Loading app..</div>;
  }

  return (
    <>
      <div className={styles.App}>
        <div className={styles.container}>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/(.+)">
            <h1>App</h1>
            {user && <p>User: {user.userName}</p>}
            {isLoggedIn && <button onClick={logout}>Logout</button>}
            <NavBar />
            <Switch>
              <PrivateRoute path="/categories" exact>
                <CategoryListPage />
              </PrivateRoute>
              <PrivateRoute path="/categories/create" exact>
                <CategoryCreatePage />
              </PrivateRoute>
              <PrivateRoute path="/categories/:id" exact>
                <CategoryDetailsPage />
              </PrivateRoute>
              <PrivateRoute path="/articles" exact>
                <ArticleListPage />
              </PrivateRoute>
              <PrivateRoute path="/articles/create" exact>
                <ArticleCreatePage />
              </PrivateRoute>
              <PrivateRoute path="/articles/:id" exact>
                <ArticleDetailsPage />
              </PrivateRoute>
              <PrivateRoute path="/articles/:articleId/images" exact>
                <ImageListPage />
              </PrivateRoute>
              <PrivateRoute path="/articles/:articleId/images/:id" exact>
                <ImageDetailsPage />
              </PrivateRoute>
              <PrivateRoute path="/users" exact>
                <UserListPage />
              </PrivateRoute>
              <PrivateRoute path="/users/:id" exact>
                <UserDetailsPage />
              </PrivateRoute>
              <PrivateRoute path="/(.+)" exact={false}>
                <NotFoundPage />
              </PrivateRoute>
            </Switch>
          </Route>
        </div>
      </div>
    </>
  );
};

export default observer(App);
