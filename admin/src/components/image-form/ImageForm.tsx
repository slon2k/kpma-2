import React, { useContext, FormEvent } from "react";
import { IImage } from "../../models";
import { StoreContext } from "../../store/rootStore";
import useForm from "../../hooks/useForm";
import { observer } from "mobx-react-lite";
import { history } from "../../";
import { Link } from "react-router-dom";

type Props = {
  image?: IImage;
  articleId: number;
};

const ImageForm: React.FC<Props> = ({ image, articleId }) => {
  const initialForm: IImage = {
    id: 0,
    imageName: "placeholder.png",
    imagePath: "/img",
    caption: "",
    altText: "image",
    isMain: false,
    articleId: articleId,
    fullName: "/img/placeholder.png",
  };

  const context = useContext(StoreContext);
  const {
    createImage,
    updateImage,
    updatingImage,
    deletingImage,
    deleteImage,
  } = context.imageStore;

  const { form, handleChange, handleCheck } = useForm<IImage>(
    image ? image : initialForm
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (form.id === 0) {
      createImage(articleId, form).then(() =>
        history.push(`/articles/${articleId}`)
      );
    } else {
      updateImage(articleId, form).then(() =>
        history.push(`/articles/${articleId}`)
      );
    }
  };

  const handleDelete = () => {
    if (image && image.id > 0) {
      deleteImage(articleId, image.id).then(() =>
        history.push(`/articles/${articleId}`)
      );
    }
  };

  return (
    <div>
      <h3>Image form</h3>
      <form>
        <p>
          <label>
            Image path:
            <input
              type="text"
              onChange={handleChange}
              name="imagePath"
              value={form.imagePath}
            />
          </label>
        </p>
        <p>
          <label>
            Image name:
            <input
              type="text"
              onChange={handleChange}
              name="imageName"
              value={form.imageName}
            />
          </label>
        </p>
        <p>
          <label>
            Main:
            <input
              type="checkbox"
              onChange={handleCheck}
              name="isMain"
              checked={form.isMain}
            />
          </label>
        </p>
        <p>
          <label>
            Alt text:
            <input
              type="text"
              onChange={handleChange}
              name="altText"
              value={form.altText}
            />
          </label>
        </p>
        <p>
          <label>
            Caption:
            <input
              type="text"
              onChange={handleChange}
              name="caption"
              value={form.caption}
            />
          </label>
        </p>
        <Link to={`/articles/${articleId}`}>
          <button type="button">cancel</button>
        </Link>
        <button type="button" onClick={handleSubmit}>
          submit
        </button>
        <br />
        {image && image.id > 0 && (
          <button type="button" onClick={handleDelete}>
            delete
          </button>
        )}
        {updatingImage && <div>Updating ...</div>}
        {deletingImage && <div>Deleting ...</div>}
      </form>
    </div>
  );
};

export default observer(ImageForm);
