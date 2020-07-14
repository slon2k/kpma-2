import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../store/rootStore";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

type Props = {
  articleId: number;
};

const ImageList: React.FC<Props> = ({ articleId }) => {
  const context = useContext(StoreContext);
  const { images, loadingImages, loadImages } = context.imageStore;

  useEffect(() => {
    loadImages(articleId);
  }, [loadImages, articleId]);

  if (loadingImages) {
    return <div>Loading images...</div>;
  }

  return (
    <div>
      <ul>
        {images.map((image) => (
          <li key={image.id}>
            <NavLink to={`/articles/${image.articleId}/images/${image.id}`}>
              {image.imageName}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default observer(ImageList);
