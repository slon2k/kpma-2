import React from "react";
import phone from "./icons/phone.svg";

type Props = {
  type: string;
};

const Icon: React.FC<Props> = ({ type }) => {
  if (type === "phone") {
    return (
      <i>
        <img src={phone} alt="phone" />
      </i>
    );
  } else {
    return null;
  }
};

export default Icon;
