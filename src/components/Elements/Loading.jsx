import React from "react";

function Loading({ load }) {
  return (
    load && (
      <div className="absolute h-full w-full z-50">
        <div className=" flex items-center justify-center h-full w-full bg-black opacity-55">
          <div className="loginLoader"></div>
        </div>
      </div>
    )
  );
}

export default Loading;
