import React, { useContext } from "react";
import { StoreContext } from "../../store/rootStore";
import { observer } from "mobx-react-lite";
import styles from "./LanguageSwitcher.module.scss";

const LanguageSwitcher: React.FC = () => {
  const { appStore } = useContext(StoreContext);
  const { language, setLanguage } = appStore;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setLanguage(e.target.value);

  return (
    <div className={styles.LanguageSwitcher}>
      <select
        className={styles.select}
        name="language"
        id="language"
        defaultValue={language}
        onChange={handleChange}
      >
        <option className={styles.option} value={"ru"}>
          Русский
        </option>
        <option className={styles.option} value={"en"}>
          English
        </option>
        <option className={styles.option} value={"kk"}>
          Қазақ
        </option>
      </select>
    </div>
  );
};

export default observer(LanguageSwitcher);
