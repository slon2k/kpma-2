import React, { useContext } from "react";
import { StoreContext } from "../../store/rootStore";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

const ArticleList: React.FC = () => {
  const context = useContext(StoreContext);
  const { articles } = context.articleStore;

  return (
    <div>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <NavLink to={`/articles/${article.id}`}>{article.slug}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default observer(ArticleList);
