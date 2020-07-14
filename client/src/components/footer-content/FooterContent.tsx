import React from "react";
import styles from "./FooterContent.module.scss";
import FastForwardIcon from "../icon/fast-forward";
import { Link } from "react-router-dom";

const icon = () => <FastForwardIcon size={10} color="red" />;

const FooterContent: React.FC = () => {
  return (
    <div className={styles.FooterContent}>
      <div className={styles.flexcontainer}>
        <div className={styles.left}>
          <h3>About</h3>
          <ul>
            <li>
              {icon()} <Link to="/about">О нас</Link>
            </li>
            <li>
              {icon()} <Link to="/certification">Сертификация</Link>
            </li>
            <li>
              {icon()} <Link to="/contact">Контакты</Link>
            </li>
            <li>
              {icon()} <Link to="/members">Члены ассоциации</Link>
            </li>
            <li>
              {icon()} <Link to="http://www.ipma.world">IPMA</Link>
            </li>
          </ul>
        </div>

        <div className={styles.center}>
          <h3>Subscribe</h3>
        </div>
        <div className={styles.right}>
          <h3>Contacts</h3>
          <ul>
            <li>
              <span>050059 Искендерова 64а,</span> <br />
              <span>Алматы, Казахстан</span>
            </li>
            <li>+7 727 3272114</li>
            <li>+7 727 3131554</li>
            <li>kpma@kpma.kz</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FooterContent;
