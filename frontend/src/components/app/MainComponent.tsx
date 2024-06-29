import * as React from "react";
import Navbar from "./Navbar";

interface MainComponentProps{
  children: React.ReactNode;
}

function MainComponent({ children }: MainComponentProps): JSX.Element {
  return (
    <div className="flex flex-col">
      <Navbar />
      {children}
    </div>
  );
}

export default MainComponent;
