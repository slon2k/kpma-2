import React, { useEffect, useContext } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import ImageForm from "../components/image-form";
import { StoreContext } from "../store/rootStore";
import { observer } from "mobx-react-lite";

type Params = {
  articleId: string;
  id: string;
};

const ImageDetailsPage: React.FC<RouteComponentProps<Params>> = ({ match }) => {
  const { id, articleId } = match.params;
  const context = useContext(StoreContext);
  const { image, loadingImage, loadImage } = context.imageStore;

  useEffect(() => {
    loadImage(parseInt(articleId), parseInt(id));
  }, [loadImage, id, articleId]);

  if (loadingImage) {
    return <div>Loading image...</div>;
  }

  if (image == null) {
    return <div>Image not found</div>;
  }
  
  return (
    <div>
      <h2>Image details</h2>
      <ImageForm image={image} articleId={parseInt(articleId)}/>
    </div>
  );
};

export default withRouter(observer(ImageDetailsPage));
