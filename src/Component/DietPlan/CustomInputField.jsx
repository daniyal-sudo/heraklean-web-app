import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const CustomInputField = (props) => {
  const [focus, setFocus] = useState(false);

  return (
    <div className="container m-0">
      <div className="row">
        <div className="col-md-6 label-input-section p-0">
          <input
          style={{
                fontFamily: 'Poppins',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: '24px',
                textAlign: 'left',
                color: '#263238',
          }}
            type="number"
            name={props.name}
            value={props.value}
            className={`form-control custom-input ${focus ? "focus" : ""}`}
            placeholder="0"
            onChange={props.action}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
             <span   style={{
              width: '13px',
              height: '24px',
              fontFamily: 'Poppins',
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: '24px',
              textAlign: 'left',
              color: '#263238',
      }}>G</span>
        </div>
      </div>
    </div>
  );
};

export default CustomInputField;
