import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiEdit2Fill } from "react-icons/ri";
import axios from "axios";

const ProgramCard = ({ title, introduction, modules, duration }) => (
  <div className="col-md-4 col-sm-6 mb-4">
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="card-title fw-bold mb-0">{title}</h5>
          <RiEdit2Fill size={18} className="text-primary cursor-pointer" />
        </div>
        <p className="card-text small text-muted">{introduction}</p>
        <div className="mt-2">
          <h6 className="fw-bold">Modules</h6>
          <ul className="list-unstyled small">
            {modules.map((module, index) => (
              <li key={index}>{module}</li>
            ))}
          </ul>
        </div>
        <div className="mt-2">
          <h6 className="fw-bold">Duration</h6>
          <p className="small mb-0">{duration}</p>
        </div>
      </div>
    </div>
  </div>
);

const ProgramPlans = () => {
  const [programs, setPrograms] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);

  // Fetch programs from API
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://82.112.240.94:5001/api/auth/getTrainerProgramPlans",{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPrograms(response.data.programPlans);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };
    fetchPrograms();
  }, []);

  // Handle day click
  const handleDayClick = (day, program) => {
    setSelectedDay(program[day]);
    setSelectedProgram(program.programTitle);
  };

  return (
    <div className="container mt-5">
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h2 className="fw-bold">Program Plans</h2>
          <Link to="/create-program" className="btn btn-primary">
            Create New
          </Link>
        </div>
      </div>

      <div className="row">
        {programs.map((program, index) => (
          <div key={index} className="col-md-4 col-sm-6 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="fw-bold">{program.programTitle}</h5>

                <div className="d-flex flex-wrap mt-3">
                  {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
                    <button
                      key={day}
                      className="btn btn-outline-primary m-1"
                      onClick={() => handleDayClick(day, program)}
                    >
                      {day.charAt(0).toUpperCase() + day.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show selected day details */}
      {selectedDay && (
        <div className="card mt-4 p-4 shadow">
          <h4 className="fw-bold">{selectedProgram}</h4>
          <h5 className="mt-2">{selectedDay.title}</h5>
          <p>{selectedDay.description}</p>
          <div className="mt-2">
            <h6 className="fw-bold">Modules</h6>
            <ul className="list-unstyled">
              {selectedDay.modules.map((module, index) => (
                <li key={index}>{module}</li>
              ))}
            </ul>
          </div>
          <p className="mt-2">
            <strong>Duration:</strong> {selectedDay.duration}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProgramPlans;
