import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import ArticleList from "../components/article-list";

export interface IParams {
  categoryName: string;
}

const CategoryPage: React.FC<RouteComponentProps<IParams>> = ({ match }) => {
  const { categoryName } = match.params;
  return (
    <div>
      <h2>Category Page</h2>
      <ArticleList categoryName = {categoryName}/>

    </div>
  );
};

export default withRouter(CategoryPage);
