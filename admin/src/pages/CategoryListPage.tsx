import React from "react";
import CategoryList from "../components/category-list";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import useArticleContext from "../hooks/useArticleContext";

const CategoryListPage: React.FC = () => {
  const { dataLoaded } = useArticleContext();

  if (!dataLoaded) {
    return <div>Loading categories...</div>;
  }

  return (
    <div>
      <h2>CategoryList</h2>
      <CategoryList />
      <NavLink to="/categories/create">Add category</NavLink>
    </div>
  );
};

export default observer(CategoryListPage);
