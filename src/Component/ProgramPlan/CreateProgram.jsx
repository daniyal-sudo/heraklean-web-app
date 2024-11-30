import React, { useState } from "react";
import axios from "axios";
import Sidebar from "./../Home/Sidebar";
import "./../CreateClient/CreateClient.css";
import { Modal, Button, Form } from "react-bootstrap";
import Header from "../CommonComponent/Header";
import CommonForm from "../ProgramPlan/CommonFrom";
import { errorMessage, successMessage } from "../../Toast/Toast";
import WorkOut from "./WorkOut";

const CreateProgram = ({ onClose,setShowComponent}) => {
  const [programTitle, setProgramTitle] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [dayDetails, setDayDetails] = useState({
    monday: {},
    tuesday: {},
    wednesday: {},
    thursday: {},
    friday: {},
    saturday: {},
    sunday: {},
  });
  const [dayModal, setDayModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    modules: "",
    duration: "",
  });

  // const [showComponent, setShowComponent] = useState("");

  // Add missing state for the day form
  const [dayForm, setDayForm] = useState({
    title: "",
    description: "",
    modules: "",
    duration: "",
  });

  // Open modal for selected day
  // const handleDayClick = (day) => {
  //   setSelectedDay(day);
  //   const selectedDayDetails = dayDetails[day] || { title: '', description: '', modules: '', duration: '' };
  //   setDayForm(selectedDayDetails); // Set day form with selected day details
  //   setDayModal(true);
  // };

  // Close modal
  const handleClose = () => setDayModal(false);

  // Handle input changes for the day form
  const handleDayFormChange = (e) => {
    const { name, value } = e.target;

    setDayForm({
      ...dayForm,
      [name]: value,
    });
  };

  // Handle save day details
  const handleSaveDayDetails = () => {
    setDayDetails((prevDetails) => ({
      ...prevDetails,
      [selectedDay]: { ...dayForm }, // Save form data for the selected day
    }));
    handleClose();
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const days = {
      monday: {},
      tuesday: {},
      wednesday: {},
      thursday: {},
      friday: {},
      saturday: {},
      sunday: {},
    };

    if (selectedDay) {
      days[selectedDay] = { ...dayForm }; // Push data into the selected day's object
    }

    // Log the updated days object to see the changes
    console.log("Updated days object:", days);

    const programData = {
      programTitle,
      days: days, // Pass the complete days object in the payload
    };
    // console.log('vvvvvv',programData)
    // return false

    try {
      const token = localStorage.getItem("token");
      console.log(programData); // Verify the programData structure
      const response = await axios.post(
        "http://localhost:5001/api/auth/createProgramPlan",
        programData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        successMessage(response.data.message);
        onClose();
      } else {
        errorMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error creating program");
    }
  };

  return (
    <>
      <div className="space-page">
        <div className="container p-0 m-0" style={{ height: "100dvh" }}>


          <div className="diet-plan-section-page">
            <CommonForm
              handleSubmit={handleSubmit}
              onClose={onClose}
              setSelectedDay={setSelectedDay}
              selectedDay={selectedDay}
              handleDayFormChange={handleDayFormChange}
              setDayForm={setDayForm}
              dayForm={dayForm}
              handleSaveDayDetails={handleSaveDayDetails}
              setProgramTitle={setProgramTitle}
              programTitle={programTitle}
              setShowComponent={setShowComponent}
            />
            {/* <form onSubmit={handleSubmit}>
                    <div className="row mt-4 me-3">
                      <p className="fs-4 fw-bold">Create Program</p>
                      <div className="col-lg-6">
                        <div className="form-group mb-3">
                          <label htmlFor="programTitle">Program Title</label>
                          <input
                            type="text"
                            className="form-control"
                            id="programTitle"
                            value={programTitle}
                            onChange={(e) => setProgramTitle(e.target.value)}
                            required
                          />
                        </div>

                        <div className="form-group mb-3">
                          <label htmlFor="days">Select Day to Add Program Details</label>
                          <div className="d-flex flex-wrap gap-2">
                            {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                              <Button key={day} variant="outline-primary" className="me-2 mb-2" onClick={() => handleDayClick(day)}>
                                {day.charAt(0).toUpperCase() + day.slice(1)}
                              </Button>
                            ))}
                          </div>
                        </div>
                        <Button type="submit" className="btn btn-primary">
                          Submit Program
                        </Button>
                      </div>
                    </div>
                  </form> */}
          </div>
        </div>
      </div>

      {/* Modal for filling day details */}
      {/* <Modal show={dayModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Program Details for {selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={dayForm.title || ''}
                onChange={handleDayFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={dayForm.description || ''}
                onChange={handleDayFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Modules (comma separated)</Form.Label>
              <Form.Control
                type="text"
                name="modules"
                value={dayForm.modules || ''}
                onChange={handleDayFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Duration (e.g., 1 hour)</Form.Label>
              <Form.Control
                type="text"
                name="duration"
                value={dayForm.duration || ''}
                onChange={handleDayFormChange}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveDayDetails}>
            Save Details
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
};

export default CreateProgram;
