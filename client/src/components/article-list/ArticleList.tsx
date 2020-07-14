import React, { useContext } from "react";
import { StoreContext } from "../../store/rootStore";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";

interface IProps {
  categoryName: string;
}

const ArticleList: React.FC<IProps> = ({ categoryName }) => {
  const { articleStore, appStore } = useContext(StoreContext);
  const { articles, loadingArticles } = articleStore;
  const { language } = appStore;

  if (loadingArticles) {
    return <div>Loading articles...</div>;
  }

  const filteredArticles = articles.filter(
    (a) => a.categoryName === categoryName
  );

  return (
    <div key={categoryName}>
      <h3>{categoryName}</h3>
      <ul>
        {filteredArticles.map((article) => (
          <li key={article.id}>
            <NavLink to={`${categoryName}/${article.slug}`}>
              {article.title[language] ||
                article.title["ru"] ||
                article.title["en"]}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default observer(ArticleList);
