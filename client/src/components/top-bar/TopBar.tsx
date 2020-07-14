import React from "react";
import styles from "./TopBar.module.scss";
import LanguageSwitcher from "../language-switcher";
import TopContacts from "../top-contacts";

const TopBar: React.FC = () => {
  return (
    <div className={styles.TopBar}>
      <div className={styles.container}>
        <TopContacts />
        <LanguageSwitcher />
      </div>
    </div>
  );
};

export default TopBar;
