import React from "react";

import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";

const MailLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};

export default MailLayout;
