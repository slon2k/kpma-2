import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../store/rootStore";
import { observer } from "mobx-react-lite";

type Props = {
  articleId: number;
  imageId: number;
};

const ImageDetails: React.FC<Props> = ({ articleId, imageId }) => {
  const context = useContext(StoreContext);
  const { image, loadingImage, loadImage } = context.imageStore;

  useEffect(() => {
    loadImage(articleId, imageId);
  }, [loadImage, imageId, articleId]);

  if (loadingImage) {
    return <div>Loading images...</div>;
  }

  if (image == null) {
    return <div>Image not found</div>;
  }

  return (
    <div>
      <h3>Article: {articleId}</h3>
      <h4>Image: {imageId}</h4>
      {image.imageName}
    </div>
  );
};

export default observer(ImageDetails);
