import { useContext, useEffect } from "react";
import { StoreContext } from "../store/rootStore";

const useArticleContext = () => {
  const context = useContext(StoreContext);
  const articleContext = context.articleStore;
  const categoryContext = context.categoryStore;
  const { articlesLoaded, loadArticles } = context.articleStore;
  const { loadCategories, categoriesLoaded } = context.categoryStore;

  useEffect(() => {
    if (!articlesLoaded) {
      loadArticles();
    }
  }, [loadArticles, articlesLoaded]);

  useEffect(() => {
    if (!categoriesLoaded) {
      loadCategories();
    }
  }, [loadCategories, categoriesLoaded]);

  const dataLoaded = categoriesLoaded && articlesLoaded;

  return { dataLoaded, articleContext, categoryContext };
};

export default useArticleContext;
