import React, { useContext, useEffect } from "react";
import styles from "./App.module.scss";
import { HomePage, CategoryPage, ArticlePage } from "../../pages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../../store/rootStore";
import DefaultLayout from "../../layouts/DefaultLayout";

const App: React.FC = () => {
  const context = useContext(StoreContext);
  const { appLoaded, setAppLoaded } = context.appStore;
  const { loadArticles, loadingArticles } = context.articleStore;
  const { loadMenu } = context.menuStore;

  useEffect(() => {
    loadMenu()
      .then(() => loadArticles())
      .finally(() => setAppLoaded());
  }, [loadMenu, setAppLoaded, loadArticles]);

  if (!appLoaded) {
    return <div>Loading app..</div>;
  }

  return (
    <Router>
      <div className={styles.App}>
        <Switch>
          <DefaultLayout>
            <Route path="/:categoryName/:articleName" exact>
              <ArticlePage />
            </Route>
            <Route path="/:categoryName" exact>
              <CategoryPage />
            </Route>
            <Route path="/" exact>
              <HomePage />
            </Route>
          </DefaultLayout>
        </Switch>
      </div>
    </Router>
  );
};

export default observer(App);
