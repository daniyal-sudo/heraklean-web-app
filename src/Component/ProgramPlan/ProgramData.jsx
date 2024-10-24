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
        const response = await axios.get(
          "http://82.112.240.94:5001/api/auth/getTrainerProgramPlans",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
    <div className="container">
      <div className="diet-plan-section-page">
      <div className="container mt-5">
        <div className="row mb-4">
          <div className="col-12 d-flex justify-content-between align-items-center">
            <h2 className="custom-head">Program Plans</h2>
            <button className="btn btn-primary" >
              <div className="plus-icon mr-2">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.10513 1.11661C12.5194 0.516469 17.9834 0.516469 23.3976 1.11661C26.3954 1.45261 28.8139 3.81336 29.1656 6.82161C29.8079 12.3131 29.8079 17.8607 29.1656 23.3521C28.8139 26.3604 26.3954 28.7211 23.3976 29.0571C17.9834 29.6574 12.5194 29.6574 7.10513 29.0571C4.10738 28.7211 1.68888 26.3604 1.33713 23.3521C0.694915 17.8612 0.694915 12.3142 1.33713 6.82336C1.51505 5.36188 2.1813 4.00331 3.22789 2.96784C4.27448 1.93236 5.64009 1.28066 7.10338 1.11836M15.2514 6.34911C15.5995 6.34911 15.9333 6.48739 16.1795 6.73353C16.4256 6.97967 16.5639 7.31351 16.5639 7.66161V13.7744H22.6766C23.0247 13.7744 23.3586 13.9126 23.6047 14.1588C23.8509 14.4049 23.9891 14.7388 23.9891 15.0869C23.9891 15.435 23.8509 15.7688 23.6047 16.0149C23.3586 16.2611 23.0247 16.3994 22.6766 16.3994H16.5639V22.5121C16.5639 22.8602 16.4256 23.194 16.1795 23.4402C15.9333 23.6863 15.5995 23.8246 15.2514 23.8246C14.9033 23.8246 14.5694 23.6863 14.3233 23.4402C14.0772 23.194 13.9389 22.8602 13.9389 22.5121V16.3994H7.82613C7.47803 16.3994 7.1442 16.2611 6.89805 16.0149C6.65191 15.7688 6.51363 15.435 6.51363 15.0869C6.51363 14.7388 6.65191 14.4049 6.89805 14.1588C7.1442 13.9126 7.47803 13.7744 7.82613 13.7744H13.9389V7.66161C13.9389 7.31351 14.0772 6.97967 14.3233 6.73353C14.5694 6.48739 14.9033 6.34911 15.2514 6.34911Z" fill="white"/>
                  </svg>
              </div>
            <Link to="/create-program" className="btn btn-primary">
              Create New
            </Link>
            </button>
          </div>
        </div>

        <div className="row program-diet">
          {programs.map((program, index) => (
            <div key={index} className="col-md-4 col-sm-6 mb-4">
              <div className="card h-100 program-2">
                <div className="card-body">
                  <h5 className="custom-heads">{program.programTitle}</h5>

                  <div className="d-flex flex-wrap mt-3">
                    {[
                      "monday",
                      "tuesday",
                      "wednesday",
                      "thursday",
                      "friday",
                      "saturday",
                      "sunday",
                    ].map((day) => (
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
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="card p-3 program-2">
                <div className="d-flex justify-content-between align-items-start">
                  <h5 className="custom-heads">{selectedProgram}</h5>
                  <button className="btn btn-secondary btn-sm me-2">
                              <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.2433 24.5781H4.58594V18.9207L19.8326 3.67407C20.0826 3.42411 20.4217 3.28369 20.7753 3.28369C21.1288 3.28369 21.4679 3.42411 21.7179 3.67407L25.4899 7.44474C25.6139 7.56857 25.7123 7.71562 25.7794 7.87749C25.8465 8.03935 25.881 8.21285 25.881 8.38807C25.881 8.56329 25.8465 8.7368 25.7794 8.89866C25.7123 9.06052 25.6139 9.20758 25.4899 9.33141L10.2433 24.5781ZM4.58594 27.2447H28.5859V29.9114H4.58594V27.2447Z" fill="white"/>
            </svg>
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
