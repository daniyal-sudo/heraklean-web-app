import React from "react";
import { IoMdClose } from "react-icons/io";

function CloseButton2({ top = "-13px", right = "-27px" }) {
  return (
    <IoMdClose
      style={{
        position: "relative",
        top: top,
        right: right,
        fontSize: 16,
      }}
    />
  );
}

export default CloseButton2;
