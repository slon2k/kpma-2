import React from "react";

type Props = {
  image: string;
  height?: number;
  width?: number;
};

const Image: React.FC<Props> = ({ image, height, width }) => {
  const style = {
    width: width ? `${width}px` : "100%",
    height: height ? `${height}px` : "100%",
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  };

  return <div style={style}></div>;
};

export default Image;
