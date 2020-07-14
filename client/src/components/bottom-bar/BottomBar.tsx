import React, { useContext } from "react";
import styles from "./BottomBar.module.scss";
import { StoreContext } from "../../store/rootStore";
import { observer } from "mobx-react-lite";

const text: { [key: string]: string } = {
  ru: "Казахстанская Ассоциация Управления Проектами",
  en: "Kazakhstan Project Management Association",
  kk: "Қазақстанның Жобаларды Басқару Қауымдастығы",
};

const BottomBar: React.FC = () => {
  const { appStore } = useContext(StoreContext);
  const { language } = appStore;

  return (
    <div className={styles.BottomBar}>
      <div className="container">
        <span className={styles.copyright}>
          © {new Date().getFullYear()} - {text[language]}
        </span>
      </div>
    </div>
  );
};

export default observer(BottomBar);
