import * as React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface MainComponentProps {
  children: React.ReactNode;
}

function MainComponent({ children }: MainComponentProps): JSX.Element {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default MainComponent;
