import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
//import OverlaysSection from "@/sections/OverlaySection";

const StandardLayout = (props) => {
  const { children, overlays } = props;

  return (
    <>
      {/* <OverlaysSection data={overlays} /> */}

      <Header data={props?.data} menuData={props?.navbar} />
      {children}
      <Footer data={props?.data} />
    </>
  );
};

export default StandardLayout;
