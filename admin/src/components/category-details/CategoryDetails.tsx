import React from "react";
import { ICategory } from "../../models";

type Props = {
  category: ICategory;
  categories: ICategory[];
  setEditMode: (mode: boolean) => void;
};

const CategoryDetails: React.FC<Props> = ({
  category,
  categories,
  setEditMode,
}) => {
  const parentCategory = category.parentId
    ? categories.find((c) => c.id === category.parentId)
    : null;

  return (
    <div>
      <p>
        <strong>Title: </strong>
        <span>{category.title["ru"] || category.title["en"]}</span>
      </p>
      <p>
        <strong>Slug: </strong>
        <span>{category.slug}</span>
      </p>
      <p>
        <strong>Menu: </strong>
        <span>{category.isMenuItem ? "\u2611" : "\u2610"}</span>
      </p>
      <p>
        <strong>Parent category: </strong>{" "}
        <span>{parentCategory && parentCategory.title["ru"]}</span>
      </p>
      <button type="button" onClick={() => setEditMode(true)}>
        edit
      </button>
    </div>
  );
};

export default CategoryDetails;
