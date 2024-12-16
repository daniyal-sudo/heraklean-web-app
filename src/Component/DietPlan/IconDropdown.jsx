import React from 'react';
import { FaChevronDown } from 'react-icons/fa'; // Import arrow icon

const IconDropdown = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div
        className="rounded-circle d-flex justify-content-center align-items-center"
        style={{
          width: '40px',
          height: '40px',
          cursor: 'pointer',
          backgroundColor: '#fff',
          color: '#263238',
        }}
      >
        <FaChevronDown color="#0B0B0B" /> {/* Arrow Icon */}
      </div>
    </div>
  );
};

export default IconDropdown;
