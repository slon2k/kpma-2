import React, { ReactNode } from "react";
import AppHeader from "../components/app-header";
import AppFooter from "../components/app-footer";

interface IProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<IProps> = ({ children }) => {
  return (
    <>
      <AppHeader />
      {children}
      <AppFooter />
    </>
  );
};

export default DefaultLayout;
