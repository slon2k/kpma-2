import React from "react";
import NavBar from "../nav-bar";
import TopBar from "../top-bar";
import styles from "./AppHeader.module.scss"

const AppHeader: React.FC = () => {
  return (
    <header className={styles.AppHeader}>
      <TopBar />
      <NavBar />
    </header>
  );
};

export default AppHeader;
