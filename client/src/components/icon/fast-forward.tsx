import React from "react";

type Props = {
  size?: number;
  color?: string;
  className?: string;
  viewBox?: string;
};

const FastForwardIcon : React.FC<Props> = ({ size, color, className, viewBox }) => {
  return (
    <svg
      width={size || "100%"}
      height={size || "100%"}
      viewBox={viewBox || "0 0 256 256"}
      xmlns="http://www.w3.org/2000/svg"
      className={`${className || ""}`}
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path fill={color} d="M188.527,87.755l-83.009-84.2c-4.692-4.74-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l74.54,75.61
			l-74.54,75.61c-4.704,4.74-4.704,12.439,0,17.179c4.704,4.74,12.319,4.74,17.011,0l82.997-84.2
			C193.05,100.375,193.062,92.327,188.527,87.755z"/>
		<path fill={color} d="M104.315,87.755l-82.997-84.2c-4.704-4.74-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l74.528,75.61
			l-74.54,75.61c-4.704,4.74-4.704,12.439,0,17.179s12.319,4.74,17.011,0l82.997-84.2C108.838,100.375,108.85,92.327,104.315,87.755
			z"/>
    </svg>
  )
}

export default FastForwardIcon