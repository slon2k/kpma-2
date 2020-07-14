import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import ArticleDetails from "../components/article-details";

export interface IParams {
  categoryName: string;
  articleName: string;
}

const ArticlePage: React.FC<RouteComponentProps<IParams>> = ({ match }) => {
  const { categoryName, articleName } = match.params;
  return (
    <div>
      <h2>Article Page</h2>
      <h3>{categoryName}</h3>
      <ArticleDetails articleName={articleName} />
    </div>
  );
};

export default withRouter(ArticlePage);
