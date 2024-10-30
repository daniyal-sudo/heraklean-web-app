import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiEdit2Fill } from "react-icons/ri";
import axios from "axios";
import { Dropdown } from "react-bootstrap";

const ProgramPlans = () => {
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const [selectedDayValue, setSelectedDayValue] = useState(days[0]);

  // Fetch programs from API
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://82.112.240.94:5001/api/auth/getTrainerProgramPlans`,
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
    if (selectedProgram) {
      setSelectedDay(selectedProgram[day]);
    }
    setSelectedDayValue(day);
  };

  // Handle program change
  const handleProgramChange = (program) => {
    setSelectedProgram(program);
    setSelectedDay(program.monday); // default to Monday on program change
  };

  function capitalizeWords(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <div className="container m-0"  style={{ height: "100dvh", padding: "30px", maxWidth: "100%" }}>
       <div className="diet-plan-section-page">
          <div className="row mb-4">
            <div className="col-12 d-flex justify-content-between align-items-center">
              <h2 className="custom-head-2">Program Plans</h2>
              <button className="btn btn-primary show-it" style={{ height: '60px', width: '227px' }}>
                <div className="plus-icon mr-2">
                  <Link to="/create-program" className="btn btn-primary ">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.10513 1.11661C12.5194 0.516469 17.9834 0.516469 23.3976 1.11661C26.3954 1.45261 28.8139 3.81336 29.1656 6.82161C29.8079 12.3131 29.8079 17.8607 29.1656 23.3521C28.8139 26.3604 26.3954 28.7211 23.3976 29.0571C17.9834 29.6574 12.5194 29.6574 7.10513 29.0571C4.10738 28.7211 1.68888 26.3604 1.33713 23.3521C0.694915 17.8612 0.694915 12.3142 1.33713 6.82336C1.51505 5.36188 2.1813 4.00331 3.22789 2.96784C4.27448 1.93236 5.64009 1.28066 7.10338 1.11836M15.2514 6.34911C15.5995 6.34911 15.9333 6.48739 16.1795 6.73353C16.4256 6.97967 16.5639 7.31351 16.5639 7.66161V13.7744H22.6766C23.0247 13.7744 23.3586 13.9126 23.6047 14.1588C23.8509 14.4049 23.9891 14.7388 23.9891 15.0869C23.9891 15.435 23.8509 15.7688 23.6047 16.0149C23.3586 16.2611 23.0247 16.3994 22.6766 16.3994H16.5639V22.5121C16.5639 22.8602 16.4256 23.194 16.1795 23.4402C15.9333 23.6863 15.5995 23.8246 15.2514 23.8246C14.9033 23.8246 14.5694 23.6863 14.3233 23.4402C14.0772 23.194 13.9389 22.8602 13.9389 22.5121V16.3994H7.82613C7.47803 16.3994 7.1442 16.2611 6.89805 16.0149C6.65191 15.7688 6.51363 15.435 6.51363 15.0869C6.51363 14.7388 6.65191 14.4049 6.89805 14.1588C7.1442 13.9126 7.47803 13.7744 7.82613 13.7744H13.9389V7.66161C13.9389 7.31351 14.0772 6.97967 14.3233 6.73353C14.5694 6.48739 14.9033 6.34911 15.2514 6.34911Z"
                        fill="white"
                      />
                    </svg>
                  </Link>
                </div>
                <Link to="/create-program" className="btn btn-primary hiide-it" style={{ width: '227px' }}>
                  Create New
                </Link>
              </button>
            </div>
          </div>
 
          <div className="program-dropdown">
            <div className="row mb-3 g-2">
              {" "}
              {/* Add gap between columns with `g-2` */}
              {/* Program Dropdown */}
              <div className="col-12 col-md-6">
                <Dropdown
                  onSelect={(key) => handleProgramChange(programs[key])}
                  disabled={programs.length === 0}
                >
                  <Dropdown.Toggle
                    variant="light"
                    className="form-control custom-dropdown-toggle d-flex justify-content-between align-items-center"
                    style={{
                      height: "55px",
                    }}
                    disabled={programs.length === 0}
                  >
                    {programs.length === 0
                      ? "No Program Plans Available"
                      : selectedProgram
                      ? selectedProgram.programTitle
                      : "Select Program"}
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
                          <div className="thin-text">
                            {program.programTitle}
                          </div>
                        </div>
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              {/* Day Dropdown */}
              <div className="col-12 col-md-6 ">
                {" "}
                {/* Margin-top on small screens for separation */}
                <Dropdown onSelect={(day) => handleDayChange(day)}
                  disabled={programs.length === 0}>
                  <Dropdown.Toggle
                    variant="light"
                    className="form-control custom-dropdown-toggle d-flex justify-content-between align-items-center"
                    style={{
                      height: "55px",
                    }}
                    disabled={programs.length === 0}
                  >
                    {programs.length === 0 ? 
                    'First Select Program'   
                    :selectedDay
                      ? capitalizeWords(selectedDayValue)
                      : "Select Day"}
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
                        eventKey={day}
                        onClick={() => handleDayChange(day)}
                      >
                        <div className="d-flex align-items-start">
                          <input
                            type="radio"
                            name="day"
                            className="me-2"
                            checked={
                              selectedDay &&
                              selectedProgram[day] === selectedDay
                            }
                            readOnly
                          />
                          <div className="thin-text">
                            {day.charAt(0).toUpperCase() + day.slice(1)}
                          </div>
                        </div>
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>

          {/* Show selected day details */}
          {selectedDay && (
            <div className="scrolbar-program">
            <div className="row mt-5">
              <div className="col-md-6 mb-3">
                <div className="card p-3 program-2">
                  <div className="d-flex justify-content-between align-items-start">
                    <h5 className="custom-heads">
                      {selectedProgram.programTitle}
                    </h5>
                    <button className="btn btn-secondary btn-sm me-2 icon-hidden">
                      <RiEdit2Fill size={18} />
                    </button>
                  </div>
                  <div className="mt-2">
                    <h6 className="custom-head-bold">{selectedDay.title}</h6>
                    <p className="text-muted text-start">
                      {selectedDay.description}
                    </p>
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
                    <p className="text-muted text-start">
                      {selectedDay.duration}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </div>
          )}
          {!selectedDay && (
            <div className="text-center record-image no-record-found-h">
              <img src="/no-event.jpg" style={{ width: "130px" }} />
            </div>
          )}
        </div>
      </div>
  );
};

export default ProgramPlans;
