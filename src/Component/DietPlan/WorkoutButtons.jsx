import React from "react";
import WorkSearchBar from "./WorkSearchBar";
import FilterDropdown from "./FilterDropdown";
const workoutCategories = [
  "Chest",
  "Biceps",
  "Quads",
  "Back",
  "Hamstring",
  "Calves",
  "ABS",
  "Shoulder",
];

const WorkoutButtons = ({name}) => {
  return (
    <div className="p-1">
      <div className="row">
      <div className="col-md-7">
        <div className="workout-section">
        <div className="work-title-2">
          {/* Title */}
          <h2 className="head-title-wrokout">{name} Workout</h2>
          <div className="rounded mt-1 mb-4" style={{ width: "130px", height: "4px", backgroundColor: "#53AFE6" }}></div>
      </div>
      <div className="fliter-dropdown">
         <FilterDropdown />
      </div>
        </div>
      </div>
      <div className="col-md-5">
          <WorkSearchBar />
      </div>
      </div>
      {/* Buttons Container */}
      {/* <div className="d-flex flex-wrap justify-content-center">
        {workoutCategories.map((category, index) => (
          <div
            key={index}
            className={`d-flex align-items-center px-3 py-2 mr-3 mb-3 works-out-button ${checkCategoryExistence(category) &&'active'}`}
          onClick={()=>{AddDeleteObject(category)}}>
            <span className="title-catery">{category}</span>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default WorkoutButtons;
