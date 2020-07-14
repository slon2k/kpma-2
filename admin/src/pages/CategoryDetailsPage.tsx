import React, { useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import CategoryForm from "../components/category-form";
import { observer } from "mobx-react-lite";
import useArticleContext from "../hooks/useArticleContext";

type Params = {
  id: string;
};

const CategoryDetailsPage: React.FC<RouteComponentProps<Params>> = ({
  match,
}) => {
  const { id } = match.params;

  const { categoryContext, dataLoaded } = useArticleContext();
  const { setCategory, category } = categoryContext;

  useEffect(() => {
    if (dataLoaded) {
      setCategory(parseInt(id));
    }
  }, [dataLoaded, id, setCategory]);

  if (!dataLoaded) {
    return <div>Loading category...</div>;
  }

  if (category == null) {
    return <div>Category not found</div>;
  }

  return (
    <div>
      <h2>Category details</h2>
      <CategoryForm category={category} />
    </div>
  );
};

export default withRouter(observer(CategoryDetailsPage));
