import React, { useState } from "react";
import styles from "./Slides.module.scss";
import { Slide } from "../../models/Slide";
import Image from "../image";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../../styles/_animations.scss";

type Props = {
  slides: Slide[];
};

const Slides: React.FC<Props> = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  if (length === 0) {
    return null;
  }

  const next = () => {
    setCurrent((current + 1) % length);
  };
  const prev = () => {
    setCurrent((current + length - 1) % length);
  };

  const slide = slides[current];

  return (
    <div className={styles.Slides}>
      <TransitionGroup>
        <CSSTransition
          classNames={"slide"}
          timeout={{ enter: 1000, exit: 1000 }}
          key={"slide" + current}
        >
          <div className={styles.image} key={"slide" + current}>
            {Image({ image: slide.image.fullName })}
          </div>
        </CSSTransition>
      </TransitionGroup>
      <div className={styles.chevronLeft} onClick={prev}>
        <span className={styles.arrowLeft}>«</span>
      </div>
      <div className={styles.chevronRight} onClick={next}>
        <span className={styles.arrowRight}>»</span>
      </div>
      <div className={styles.imageLinks}>
        {slides.map((item, index) => (
          <div
            key={item.image.fullName}
            className={
              index === current ? styles.imageLinkActive : styles.imageLink
            }
            onClick={() => setCurrent(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slides;
