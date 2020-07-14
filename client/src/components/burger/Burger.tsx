import React, { useContext } from "react";
import styles from "./Burger.module.scss";
import { StoreContext } from "../../store/rootStore";
import { observer } from "mobx-react-lite";
import { css } from "../../utils/css";

const Burger: React.FC = () => {
  const context = useContext(StoreContext);
  const { menuOpen, toggleMenuOpen } = context.appStore;

  return (
    <div
      className={css(styles.Burger, menuOpen && styles.open)}
      onClick={toggleMenuOpen}
    >
      <span className={styles.line}></span>
    </div>
  );
};

export default observer(Burger);
