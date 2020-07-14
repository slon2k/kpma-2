import React, { useContext } from "react";
import { IMenuItem } from "../../models";
import MenuItem from "../menu-item/MenuItem";
import styles from "./Menu.module.scss";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../../store/rootStore";
import { css } from "../../utils/css";

type Props = {
  items: IMenuItem[];
  language: string;
};

const Menu: React.FC<Props> = ({ items, language }) => {
  const context = useContext(StoreContext);
  const { menuOpen } = context.appStore;

  return (
    <div className={css(styles.Menu, menuOpen && styles.open)}>
      <nav>
        <ul className={styles.items}>
          {items.map((item) => (
            <MenuItem item={item} language={language} key={item.path} />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default observer(Menu);
