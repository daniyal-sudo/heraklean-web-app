import React from 'react';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { FaDownload, FaCalendar } from 'react-icons/fa';

const SaveReport = () => {
  return (
    <div className="d-flex align-items-center gap-3 save-report-section">
      {/* Save Report Button */}
      <Button variant="outline-dark" className="d-flex align-items-center">
        <FaDownload className="me-2" /> Save Report
      </Button>

      {/* Dropdown Button */}
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle variant="outline-primary" id="dropdown-basic" className="d-flex align-items-center">
          <FaCalendar className="context" /> Weekly
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Daily</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Weekly</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Monthly</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default SaveReport;
