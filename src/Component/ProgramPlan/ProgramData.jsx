import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiEdit2Fill } from "react-icons/ri";
import axios from "axios";
import { Dropdown } from "react-bootstrap";
import CreateProgram from "./CreateProgram";
import WorkOut from "./WorkOut";
import axiosInstance from "../../Healpers/axiosInstance";
import { errorMessage, successMessage } from "../../Toast/Toast";
import Spinner from "../Loader/Spinner";

const ProgramPlans = () => {
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [tbaleselectedDay, setTableSelectedDay] = useState("1");
  const [showComponent, setShowComponent] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const [tableData, setTableData] = useState([
   
  ]);

  const [selectedDayValue, setSelectedDayValue] = useState(days[0]);

  const [dayForm, setDayForm] = useState({
    title: "",
    description: "",
    modules: "",
    id:''
  });

  // Fetch programs from API
  useEffect(() => {
    setShowLoader(true)
   
    fetchPrograms();
  }, []);
  useEffect(() => {
    if (showComponent === "") {
      setDayForm({
        id:'',
        title: "",
        description: "",
        modules: "",
      
      });

     
    }
  }, [showComponent]);

  // Handle day change

  // Handle program change

  function capitalizeWords(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const handleSubmit = async (e) => {
    if (tableData.length === 0) {
      errorMessage("Please add one exercise");
      return;
    }
    const modifiedData = tableData.map((item) => {
      const { uniqueid, ...rest } = item;  // Destructure to remove 'uniqueid' key
      return rest;  // Return a new object without the 'uniqueid'
    });
    const programData = {
      id:dayForm.id ? dayForm.id : '',
      title: dayForm.title,
      description: dayForm.description,
      modules: dayForm.modules
        ? dayForm.modules.split(",").map((item) => item.trim())
        : [],
      duration: dayForm.duration,
      exercises: modifiedData,
    };

    try {
      const response = await axiosInstance.post(
        dayForm.id  ?   '/editProgramPlan' : `/createProgramPlan`,
        programData
      );

      console.log(response, "response");

      if (response.data.success) {
        successMessage(response.data.message);
        setShowComponent("");
        fetchPrograms(); // Update this according to your logic
      } else {
        errorMessage(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        console.error("HTTP Status:", error.response.status);
        console.error("Response Data:", error.response.data);
    } else {
        console.error("Error Message:", error.message);
    }
    }
  };

  const handleEdit = (data) => {
    // alert('')
    setDayForm({
      title: data.title,
      description: data.description,
      modules: data.modules.toString(),
  
      id:data._id
    });

    setTableData(data.exercises);

    setShowComponent('craeteProgram')
  };

  const fetchPrograms = async () => {
    try {
      const response = await axiosInstance.get(`/getTrainerProgramPlans`);
      const fetchedPrograms = response.data.programPlans;
      setPrograms(fetchedPrograms);
      setShowLoader(false)

      // Default to first program and Monday data
    } catch (error) {
      console.error("Error fetching programs:", error);
    }
  };

  return (
    <>
      {showComponent === "craeteProgram" ? (
        <CreateProgram
          setShowComponent={setShowComponent}
          onClose={() => {
            setShowComponent("");
          }}
          setDayForm={setDayForm}
          dayForm={dayForm}
        />
      ) : showComponent === "showWorkout" ? (
      
          <div className="container" style={{ height: "100dvh",padding:'30px 15px' }}>
            <WorkOut
              onClose={() => {
                setShowComponent("");
              }}
              tableData={tableData}
              setTableData={setTableData}
              handleSubmit={handleSubmit}
              dayForm={dayForm}
              onBack={() => {
                setShowComponent("craeteProgram");
              }}
            />
          </div>
        
      ) : (
        <div
          className="container m-0"
          style={{ height: "100dvh", padding: "30px", maxWidth: "100%" }}
        >
          <div className="diet-plan-section-page">
            <div className="row mb-4">
              <div className="col-12 d-flex justify-content-between align-items-center">
                <h2 className="custom-head-2">Program Plans</h2>
                <button
                  className="btn btn-primary show-it"
                  style={{ height: "60px", width: "227px" }}
                  onClick={() => {
                    setShowComponent("craeteProgram");
                  }}
                >
                  <div className="plus-icon mr-2">
                    <Link className="btn btn-primary ">
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
                  <Link
                    className="btn btn-primary hiide-it"
                    style={{ width: "227px" }}
                  >
                    Create New
                  </Link>
                </button>
              </div>
            </div>

            <div className="program-dropdown"></div>

            {/* Show selected day details */}

            <div className="scrolbar-program">
              <div className="row">
                {programs.length > 0 &&
                  programs.map((program, index) => (
                    <div className="col-md-6 mb-3"key={index}>
                      <div className="card p-3 program-2">
                        <div className="d-flex justify-content-between align-items-start">
                          <h5 className="custom-heads">{program.title}</h5>
                          <button className="btn btn-secondary btn-sm icon-hidden" onClick={() => {
                              handleEdit(program);
                            }}>
                            <RiEdit2Fill size={18} />
                          </button>
                        </div>
                        <div className="mt-2">
                          <h6 className="custom-head-bold">Introduction</h6>
                          <p className="text-muted text-start">
                            {program.description}
                          </p>
                        </div>
                        <div className="mt-3">
                          <h6 className="custom-head-bold">Modules</h6>
                          <ol className="ps-3">
                            {program.modules.map((module, index) => (
                              <li key={index}>{module}</li>
                            ))}
                          </ol>
                        </div>
                        <div className="mt-3">
                          <h6 className="custom-head-bold">Duration</h6>
                          <p className="text-muted text-start">
                            {program.duration}
                          </p>
                        </div>
                        <div className="edit-section">
                          <button
                            className="btn btn-secondary btn-sm me-2 desktop-d-none"
                            onClick={() => {
                              handleEdit(program);
                            }}
                          >
                            <RiEdit2Fill size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                   {programs.length === 0 && (
              <div className="text-center record-image no-record-found-h">
                 {showLoader ? (
                    <Spinner />
                  ) : (
                <img src="/no-event.jpg" style={{ width: "130px" }} />)}
              </div>
            )}
              </div>
            </div>

           
          </div>
        </div>
      )}
    </>
  );
};

export default ProgramPlans;
