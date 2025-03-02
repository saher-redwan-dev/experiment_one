import React from "react";

export default function TempCom({ setIsShow }) {
  return (
    <div>
      TempCom
      <div onClick={() => setIsShow((prev) => !prev)}>click to toggle.</div>
    </div>
  );
}
