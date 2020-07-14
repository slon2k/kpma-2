import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../store/rootStore";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { IArticle } from "../../models";

type Props = {
  article: IArticle;
};

const ArticleDetails: React.FC<Props> = ({ article }) => {
  const context = useContext(StoreContext);
  const { categoriesInventory } = context.categoryStore;
  const category = categoriesInventory.get(article.categoryId);

  console.log(article);

  return (
    <div>
      {category && <h2>{category.slug}</h2>}
      <h3>{article.slug}</h3>
      {article.picture && (
        <NavLink to={`/articles/${article.id}/images/${article.picture.id}`}>
          Image
        </NavLink>
      )}
    </div>
  );
};

export default observer(ArticleDetails);
