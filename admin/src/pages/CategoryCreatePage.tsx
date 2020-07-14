import React, { useEffect } from "react";
import CategoryForm from "../components/category-form";
import useCategoryContext from "../hooks/useCategoryContext";

const CategoryCreatePage: React.FC = () => {
  const { categoryContext, dataLoaded } = useCategoryContext();
  const { clearCategory } = categoryContext;

  useEffect(() => {
    clearCategory();
  }, [clearCategory]);

  if (!dataLoaded) {
    return <div>Loading categories...</div>;
  }

  return (
    <div>
      <h2>Create category</h2>
      <CategoryForm />
    </div>
  );
};

export default CategoryCreatePage;
