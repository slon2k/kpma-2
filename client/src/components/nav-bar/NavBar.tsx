import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../store/rootStore";
import { observer } from "mobx-react-lite";
import Menu from "../menu";
import styles from "./NavBar.module.scss";
import Logo from "../logo";
import Burger from "../burger";
import { css } from "../../utils/css";

const OFFSET = 50;

const NavBar: React.FC = () => {
  const { menuStore, appStore } = useContext(StoreContext);
  const { menuItems, loadingMenu } = menuStore;
  const { language, setMenuOpen, menuOpen } = appStore;

  const [scrolled, setScrolled] = useState(false);

  const onScroll = (e: Event) => {
    if (window.scrollY > OFFSET && !scrolled) {
      setScrolled(true);
    }
    if (window.scrollY < OFFSET && scrolled) {
      setScrolled(false);
    }
  };

  const onResize = (e: Event) => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  });

  if (loadingMenu) {
    return <div>Loading menu...</div>;
  }
  return (
    <div className={css(styles.NavBar, scrolled && styles.scrolled)}>
      <div className={styles.container}>
        <Logo />
        <Burger />
        <Menu items={menuItems} language={language} />
      </div>
    </div>
  );
};

export default observer(NavBar);
