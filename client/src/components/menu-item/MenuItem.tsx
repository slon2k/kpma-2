import React from "react";
import { IMenuItem } from "../../models";
import { NavLink } from "react-router-dom";
import styles from "./MenuItem.module.scss";
import { observer } from "mobx-react-lite";

interface IProps {
  item: IMenuItem;
  language: string;
}

const MenuItem: React.FC<IProps> = ({ item, language }) => {
  const { path, title, subItems } = item;
  return (
    <div className={styles.MenuItem}>
      <NavLink to={path} activeClassName={styles.active}>
        {title[language] || title["ru"] || title["en"]}
      </NavLink>
      {subItems.length > 0 && (
        <ul className={styles.subItems}>
          {subItems.map((subitem) => (
            <li key={subitem.path}>
              <NavLink to={subitem.path} >
                {subitem.title[language] ||
                  subitem.title["ru"] ||
                  subitem.title["en"]}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default observer(MenuItem);
