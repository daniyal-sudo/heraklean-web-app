import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiEdit2Fill } from "react-icons/ri";
import axios from "axios";
import { Dropdown } from "react-bootstrap";

const ProgramPlans = () => {
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

  const [selectedDayValue, setSelectedDayValue] = useState(days[0]);

  // Fetch programs from API
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://82.112.240.94:5001/api/auth/getTrainerProgramPlans",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const fetchedPrograms = response.data.programPlans;
        setPrograms(fetchedPrograms);

        // Default to first program and Monday data
        if (fetchedPrograms.length > 0) {
          setSelectedProgram(fetchedPrograms[0]);
          setSelectedDay(fetchedPrograms[0].monday);
        }
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };
    fetchPrograms();
  }, []);

  // Handle day change
  const handleDayChange = (day) => {
    if (selectedProgram){
       setSelectedDay(selectedProgram[day]);}
       setSelectedDayValue(day)
  };

  // Handle program change
  const handleProgramChange = (program) => {
    setSelectedProgram(program);
    setSelectedDay(program.monday); // default to Monday on program change
  };

  function capitalizeWords(str) {
    return str
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <div className="container">
      <div className="diet-plan-section-page">
        <div className="container mt-5">
          <div className="row mb-4">
            <div className="col-12 d-flex justify-content-between align-items-center">
              <h2 className="custom-head">Program Plans</h2>
              <Link to="/create-program" className="btn btn-primary">
                Create New
              </Link>
            </div>
          </div>

          <div className="row mb-3">
            {/* Program Dropdown */}
            <div className="col-6">
            <Dropdown onSelect={(key) => handleProgramChange(programs[key])}>
              <Dropdown.Toggle
                variant="light"
                className="form-control custom-dropdown-toggle d-flex justify-content-between align-items-center"
                style={{
                  height:'55px'
                }}
              >
                 {selectedProgram ? selectedProgram.programTitle : "Select Program"}
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
                  <Dropdown.Item
                    key={index}
                    eventKey={index}
                    onClick={() => handleProgramChange(program)}
                  >
                    <div className="d-flex align-items-start">
                      <input
                        type="radio"
                        name="program"
                        className="me-2"
                        checked={selectedProgram === program}
                        readOnly
                      />
                      <div className="fw-bold">{program.programTitle}</div>
                    </div>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            </div>
            <div className="col-6">
            {/* Day Dropdown */}
            <Dropdown onSelect={(day) => handleDayChange(day)} className="ms-2">
              <Dropdown.Toggle
                variant="light"
                className="form-control custom-dropdown-toggle d-flex justify-content-between align-items-center"
                style={{
                  height:'55px'
                }}
              > {selectedDay ? capitalizeWords(selectedDayValue): "Select Day"}
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
                  <Dropdown.Item key={index} eventKey={day} onClick={() => handleDayChange(day)}>
                    <div className="d-flex align-items-start">
                      <input
                        type="radio"
                        name="day"
                        className="me-2"
                        checked={selectedDay && selectedProgram[day] === selectedDay}
                        readOnly
                      />
                      <div className="fw-bold">
                        {day.charAt(0).toUpperCase() + day.slice(1)}
                      </div>
                    </div>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            </div>
          </div>

          {/* Show selected day details */}
          {selectedDay && (
            <div className="row mt-5">
              <div className="col-md-6 mb-3">
                <div className="card p-3 program-2">
                  <div className="d-flex justify-content-between align-items-start">
                    <h5 className="custom-heads">{selectedProgram.programTitle}</h5>
                    <button className="btn btn-secondary btn-sm me-2 icon-hidden">
                      <RiEdit2Fill size={18} />
                    </button>
                  </div>
                  <div className="mt-2">
                    <h6 className="custom-head-bold">{selectedDay.title}</h6>
                    <p className="text-muted text-start">{selectedDay.description}</p>
                  </div>
                  <div className="mt-3">
                    <h6 className="custom-head-bold">Modules</h6>
                    <ol className="ps-3">
                      {selectedDay.modules.map((module, index) => (
                        <li key={index}>{module}</li>
                      ))}
                    </ol>
                  </div>
                  <div className="mt-3">
                    <h6 className="custom-head-bold">Duration</h6>
                    <p className="text-muted text-start">{selectedDay.duration}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramPlans;
