import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const PlusMinusButtons = () => {
    const buttonContainerStyle = {
        justifyContent: "flex-end",
      };
  return (
    <div className="button-container" style={buttonContainerStyle}>
      <button className="icon-button">
        <FaPlus />
      </button>
      <button className="icon-button">
        <FaMinus />
      </button>
    </div>
  );
};

export default PlusMinusButtons;
