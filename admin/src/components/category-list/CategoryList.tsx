import React, { useContext } from "react";
import { StoreContext } from "../../store/rootStore";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

const CategoryList: React.FC = () => {
  const context = useContext(StoreContext);
  const { categories } = context.categoryStore;

  return (
    <div>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <NavLink to={`/categories/${category.id}`}>
              {category.title["ru"] || category.title["en"]}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default observer(CategoryList);
