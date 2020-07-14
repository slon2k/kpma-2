import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../../store/rootStore";

interface IProps {
  articleName: string;
}

const ArticleDetails: React.FC<IProps> = ({ articleName }) => {
  const { articleStore, appStore } = useContext(StoreContext);
  const { articles, loadingArticles } = articleStore;
  const { language } = appStore;

  const article = articles.find((a) => a.slug === articleName);

  if (loadingArticles) {
    return <div>Loading article...</div>;
  }

  if (!article) {
    return <div>Article not found</div>;
  }

  const { title, body } = article;

  return (
    <div key={articleName}>
      <h3>{title[language] || title["ru"] || title["en"]}</h3>
      <p>{body[language] || body["ru"] || body["en"]}</p>
    </div>
  );
};

export default observer(ArticleDetails);
