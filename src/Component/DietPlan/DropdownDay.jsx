import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

function DropdownDay() {
  const [selectedDay, setSelectedDay] = useState('monday'); // Default value

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const handleSelect = (day) => {
    setSelectedDay(day); // Update the selected day
  };

  return (
    <div className="form-group mb-3">
      <label htmlFor="days" className="dropdown-label">Select Day</label>
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle variant="primary" id="dropdown-basic" className="custom-dropdown-toggle">
          {selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}  {/* Show the selected day */}
 
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.10513 1.11661C12.5194 0.516469 17.9834 0.516469 23.3976 1.11661C26.3954 1.45261 28.8139 3.81336 29.1656 6.82161C29.8079 12.3131 29.8079 17.8607 29.1656 23.3521C28.8139 26.3604 26.3954 28.7211 23.3976 29.0571C17.9834 29.6574 12.5194 29.6574 7.10513 29.0571C4.10738 28.7211 1.68888 26.3604 1.33713 23.3521C0.694915 17.8612 0.694915 12.3142 1.33713 6.82336C1.51505 5.36188 2.1813 4.00331 3.22789 2.96784C4.27448 1.93236 5.64009 1.28066 7.10338 1.11836M15.2514 6.34911C15.5995 6.34911 15.9333 6.48739 16.1795 6.73353C16.4256 6.97967 16.5639 7.31351 16.5639 7.66161V13.7744H22.6766C23.0247 13.7744 23.3586 13.9126 23.6047 14.1588C23.8509 14.4049 23.9891 14.7388 23.9891 15.0869C23.9891 15.435 23.8509 15.7688 23.6047 16.0149C23.3586 16.2611 23.0247 16.3994 22.6766 16.3994H16.5639V22.5121C16.5639 22.8602 16.4256 23.194 16.1795 23.4402C15.9333 23.6863 15.5995 23.8246 15.2514 23.8246C14.9033 23.8246 14.5694 23.6863 14.3233 23.4402C14.0772 23.194 13.9389 22.8602 13.9389 22.5121V16.3994H7.82613C7.47803 16.3994 7.1442 16.2611 6.89805 16.0149C6.65191 15.7688 6.51363 15.435 6.51363 15.0869C6.51363 14.7388 6.65191 14.4049 6.89805 14.1588C7.1442 13.9126 7.47803 13.7744 7.82613 13.7744H13.9389V7.66161C13.9389 7.31351 14.0772 6.97967 14.3233 6.73353C14.5694 6.48739 14.9033 6.34911 15.2514 6.34911Z" fill="white"/>
            </svg>
        </Dropdown.Toggle>

        <Dropdown.Menu className="custom-dropdown-menu">
          {days.map((day) => (
            <Dropdown.Item
              key={day}
              eventKey={day}  // Pass the selected day to the handleSelect function
              active={day === selectedDay}  // Highlight the active day
            >
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>


  );
}

export default DropdownDay;
