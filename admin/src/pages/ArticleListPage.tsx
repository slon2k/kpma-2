import React from "react";
import ArticleList from "../components/article-list";
import { observer } from "mobx-react-lite";
import useArticleContext from "../hooks/useArticleContext";
import { NavLink } from "react-router-dom";

const ArticleListPage: React.FC = () => {
  const { dataLoaded } = useArticleContext();

  if (!dataLoaded) {
    return <div>Loading articles...</div>;
  }

  return (
    <div>
      <h2>Article list</h2>
      <ArticleList />
      <NavLink to="/articles/create">Add article</NavLink>
    </div>
  );
};

export default observer(ArticleListPage);
