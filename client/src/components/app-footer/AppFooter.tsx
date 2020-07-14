import React from "react";
import BottomBar from "../bottom-bar/BottomBar";
import FooterContent from "../footer-content";

const AppFooter: React.FC = () => {
  return (
    <footer>
      <FooterContent />
      <BottomBar />
    </footer>
  );
};

export default AppFooter;
