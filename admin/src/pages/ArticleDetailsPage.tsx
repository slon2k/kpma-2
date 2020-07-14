import React, { useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import ArticleDetails from "../components/article-details";
import { observer } from "mobx-react-lite";
import useArticleContext from "../hooks/useArticleContext";
import ArticleForm from "../components/article-form";

type Params = {
  id: string;
};

const ArticleDetailsPage: React.FC<RouteComponentProps<Params>> = ({
  match,
}) => {
  const { id } = match.params;
  const articleId = parseInt(id);

  const { dataLoaded, articleContext } = useArticleContext();
  const { article, setArticle } = articleContext;

  useEffect(() => {
    if (dataLoaded) {
      setArticle(articleId);
    }
  }, [dataLoaded, setArticle, articleId]);

  if (!dataLoaded) {
    return <div>Loading article...</div>;
  }

  if (!article) {
    return (
      <div>
        <h3>Article not found</h3>
      </div>
    );
  }

  return (
    <div>
      <h2>Article details</h2>
      <ArticleForm article={article} />
    </div>
  );
};

export default withRouter(observer(ArticleDetailsPage));
