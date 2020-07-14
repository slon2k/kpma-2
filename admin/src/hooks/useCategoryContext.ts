import { useContext, useEffect } from "react";
import { StoreContext } from "../store/rootStore";

const useCategoryContext = () => {
  const context = useContext(StoreContext);
  const categoryContext = context.categoryStore;
  const { loadCategories, categoriesLoaded } = context.categoryStore;

  useEffect(() => {
    if (!categoriesLoaded) {
      loadCategories();
    }
  }, [loadCategories, categoriesLoaded]);

  const dataLoaded = categoriesLoaded;
  return { categoryContext, dataLoaded };
};

export default useCategoryContext;
