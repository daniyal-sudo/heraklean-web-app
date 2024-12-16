import React, { useState } from "react";

const TwoButtons = () => {
  const [selectedButton, setSelectedButton] = useState(1);

  return (
    <div className="button-container" id="two-button">
      <button
        className={`custom-button ${selectedButton === 1 ? "active" : ""}`}
        onClick={() => setSelectedButton(1)}
      >
        Day 1
      </button>
      <button
        className={`custom-button ${selectedButton === 2 ? "active" : ""}`}
        onClick={() => setSelectedButton(2)}
      >
        Day 2
      </button>
    </div>
  );
};

export default TwoButtons;
