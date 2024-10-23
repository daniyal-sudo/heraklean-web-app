import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

const CustomDropdown = ({ programs }) => {
  const [selectedProgram, setSelectedProgram] = useState(null);

  const handleSelect = (program) => {
    setSelectedProgram(program);
  };

  return (
    <div className="program-dropdown">
         <label htmlFor="attachDietId">{name}</label>
      <Dropdown>
        
        <Dropdown.Toggle variant="light" className="form-control custom-dropdown-toggle d-flex justify-content-between align-items-center">
          {selectedProgram ? selectedProgram.title : 'Select Program'}
          {/* Custom icon with shadow */}
          <span className="dropdown-icon-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-chevron-down"
              width="18"
              height="18"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </Dropdown.Toggle>

        <Dropdown.Menu className="custom-dropdown-menu">
          {programs.map((program, index) => (
            <Dropdown.Item key={index} onClick={() => handleSelect(program)} className="custom-dropdown-item">
              <div className="d-flex align-items-start">
                <input
                  type="radio"
                  name="program"
                  className="me-2"
                  checked={selectedProgram === program}
                  onChange={() => handleSelect(program)}
                />
                <div>
                  <div className="fw-bold">{program.title}</div>
                  <div className="text-muted">{program.description}</div>
                </div>
              </div>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default CustomDropdown;
