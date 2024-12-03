import React, { useState } from "react";
import WorkoutButtons from "../DietPlan/WorkoutButtons";
import WorkTable from "./WorkTable";

const WorkOut = ({ onBack, tableData, setTableData,handleSubmit}) => {
  // onClose()

  const updateData = (index, field, value) => {
    setTableData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index][field] = value;
      return updatedData;
    });
  };

  const AddDeleteObject = (categoryName) => {
    setTableData((prevData) => {
      // Check if the array has objects and contains an object with the category name
      const objectIndex = prevData.findIndex((item) => item.category === categoryName);
  
      if (objectIndex !== -1) {
        // If an object with the category exists, remove it
        const updatedData = [...prevData];
        updatedData.splice(objectIndex, 1); // Remove the object at the found index
        return updatedData;
      } else {
        // Otherwise, add a new empty object
        return [
          ...prevData,
          {
            category: categoryName,
            exerciseName: "",
            numberOfSets: 0,
            numberOfRepetitions: 0,
            workingLoad: 0,
            coachNotes: "",
          },
        ];
      }
    });
  };

  const checkCategoryExistence = (categoryName) => {
    return tableData.some((item) => item.category === categoryName);
  };
  
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="diet-plan-section-page"
         >
            <WorkoutButtons AddDeleteObject={AddDeleteObject} checkCategoryExistence={checkCategoryExistence}/>
          </div>
        </div>
        <div className="col-md-12  mt-3">
          <div className="diet-plan-section-page"
           style={{
            height:'360px'
          }}>
            <WorkTable data={tableData} onUpdate={updateData} />
          </div>
        </div>
      </div>

      <div class="crative-button" id="workout">
        <button
          type="button"
          class="btn btn-light"
          onClick={() => {
            onBack();
          }}
        >
          Back
        </button>
        <button type="button" class="save-button btn btn-primary"
        onClick={handleSubmit}>
          Create
        </button>
      </div>
    </>
  );
};

export default WorkOut;
