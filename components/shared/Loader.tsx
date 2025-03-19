import React from "react";

function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-800/40 backdrop-blur ring-1 ring-inset ring-gray-500/20 h-28 w-64 mx-auto rounded-lg flex cursor-context-menu">
        <div className="m-auto text-gray-200">
          <div>
            <span className="w-2 h-2 ml-2 rounded-full bg-gray-200 inline-block animate-flash"></span>
            <span className="w-2 h-2 ml-2 rounded-full bg-gray-200 inline-block animate-flash [animation-delay:0.2s]"></span>
            <span className="w-2 h-2 ml-2 rounded-full bg-gray-200 inline-block animate-flash [animation-delay:0.4s]"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
