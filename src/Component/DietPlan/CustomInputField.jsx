import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const CustomInputField = () => {
  const [focus, setFocus] = useState(false);

  return (
    <div className="container m-0">
      <div className="row">
        <div className="col-md-6 label-input-section p-0">
          <input
            type="text"
            className={`form-control custom-input ${focus ? "focus" : ""}`}
            placeholder="220"
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
             <span>G</span>
        </div>
      </div>
    </div>
  );
};

export default CustomInputField;