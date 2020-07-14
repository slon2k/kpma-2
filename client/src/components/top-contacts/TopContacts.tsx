import React from "react";
import styles from "./TopContacts.module.scss";
import Icon from "../icon";

const TopContacts: React.FC = () => {
  return (
    <div className={styles.TopContacts}>
      <Icon name="phone" size={12} color="#f5f5f5"/><span style={{marginLeft: 5, marginRight: 15}}>+7 727 3272114</span>
      <Icon name="phone" size={12} color="#f5f5f5"/><span style={{marginLeft: 5}}>+7 727 3131554</span> 
    </div>
  );
};

export default TopContacts;
