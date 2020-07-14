import React from "react";
import Slides from "../components/slides";
import { Slide } from "../models/Slide";

const slides: Slide[] = [
  {
    image: {
      id: 0,
      imageName: "1.jpg",
      imagePath: "/assets/images/slides",
      isMain: false,
      fullName: "/assets/images/slides/1.jpg",
      articleId: 0,
      caption: "",
      altText: "",
    },
  },
  {
    image: {
      id: 0,
      imageName: "2.jpg",
      imagePath: "/assets/images/slides",
      isMain: false,
      fullName: "/assets/images/slides/2.jpg",
      articleId: 0,
      caption: "",
      altText: "",
    },
  },
];

const HomePage: React.FC = () => {
  return (
    <div>
      <Slides slides={slides} />
    </div>
  );
};

export default HomePage;
