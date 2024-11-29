import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import DayDropdown from "../CommonComponent/CustomDropDownPlan";
import WorkOut from "./WorkOut";

const CommonForm = ({
  handleSubmit,
  onClose,
  handleDayFormChange,
  dayForm,
  setSelectedDay,
  selectedDay,
  handleSaveDayDetails,
  programTitle,
  setProgramTitle,
}) => {
  const [showComponent, setShowComponent] = useState("");
  return (
    <>
      {showComponent === "showWorkout" ? (
        <WorkOut onClose={()=>{
          setShowComponent('')
        }} />
      ) : (
        <Form onSubmit={handleSubmit} className="p-4 creative-program">
          <h4>Create Program Plan</h4>

          {/* Program Title */}
          <div className="row">
            <div className="col-6">
              <Form.Group className="mb-4">
                <Form.Label>Program Title</Form.Label>
                <Form.Control
                  type="text"
                  name="programTitle"
                  value={programTitle}
                  onChange={(e) => {
                    setProgramTitle(e.target.value);
                  }}
                  placeholder="Type"
                  required
                />
              </Form.Group>
            </div>
            <div className="col-6">
              <Form.Group className="mb-4">
                <Form.Label>Select Day</Form.Label>
                <DayDropdown
                  selectedDay={selectedDay}
                  handleDayChange={setSelectedDay}
                />
              </Form.Group>
            </div>

            {/* Program Title */}

            <div className="col-6">
              <Form.Group className="mb-4">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={dayForm.title}
                  onChange={handleDayFormChange}
                  placeholder="Type"
                  required
                />
              </Form.Group>
            </div>

            <div className="col-6">
              <Form.Group className="mb-4">
                <Form.Label>Duration (e.g., 1 hour)</Form.Label>
                <Form.Control
                  type="text"
                  name="duration"
                  value={dayForm.duration}
                  onChange={handleDayFormChange}
                  placeholder="Duration"
                  required
                />
              </Form.Group>
            </div>
            {/* General Notes */}
            <div className="col-6">
              <Form.Group className="mb-4">
                <Form.Label>General Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={dayForm.description}
                  onChange={handleDayFormChange}
                  rows={3}
                  placeholder="Type"
                  required
                />
              </Form.Group>
            </div>

            {/* Warm Up */}
            <div className="col-6">
              <Form.Group className="mb-4">
                <Form.Label>Modules (comma separated)</Form.Label>
                <Form.Control
                  as="textarea"
                  name="modules"
                  value={dayForm.modules || ""}
                  onChange={handleDayFormChange}
                  rows={3}
                  placeholder="Type"
                  required
                />
              </Form.Group>
            </div>
          </div>

          {/* Submit Button */}
          <div class="crative-button">
            {/* <button  onClick={()=>{
          handleSaveDayDetails()
        }} class="btn btn-primary">
          Save Detail
        </button> */}
            <button
              onClick={() => {
                setShowComponent("showWorkout");
              }}
              class="btn btn-primary"
            >
              Next
            </button>
            <button
              class="btn btn-light cancel-section"
              onClick={() => {
                onClose();
              }}
            >
              Cancel
            </button>
          </div>
        </Form>
      )}
    </>
  );
};

export default CommonForm;
