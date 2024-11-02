import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useState } from 'react';

const DayDropdown = ({ selectedDay, handleDayChange }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [selectedDayLabel, setSelectedDayLabel] = useState(selectedDay ? selectedDay : "Select Day");

  return (
    <Dropdown
      onSelect={(key) => {
        setSelectedDayLabel(days[key]);
        handleDayChange(days[key]);
      }}
    >
      <Dropdown.Toggle
        variant="light"
        className="form-control custom-dropdown-toggle d-flex justify-content-between align-items-center"
        style={{ height: '55px' }}
      >
        {selectedDayLabel}
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
        {days.map((day, index) => (
          <Dropdown.Item
            key={index}
            eventKey={index}
            onClick={() => handleDayChange(day)}
          >
            <div className="d-flex align-items-start">
              
              <div className="thin-text">{day}</div>
            </div>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DayDropdown;
