import React from "react";
import ImageList from "../components/image-list";
import { RouteComponentProps, withRouter } from "react-router-dom";

type Params = {
  articleId: string;
};

const ImageListPage: React.FC<RouteComponentProps<Params>> = ({ match }) => {
  const { articleId } = match.params;
  const id = parseInt(articleId);

  return (
    <div>
      <h2>Image list</h2>
      <ImageList articleId={id} />
    </div>
  );
};

export default withRouter(ImageListPage);
