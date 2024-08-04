import React from "react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className=" flex items-center justify-end space-x-2">
        <h1 className="text-4xl font-bold text-primary">TraceMyIP</h1>
      </div>
    </header>
  );
};

export default Header;
