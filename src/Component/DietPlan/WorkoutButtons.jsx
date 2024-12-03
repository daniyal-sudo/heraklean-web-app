import React from "react";
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

const WorkoutButtons = ({AddDeleteObject,checkCategoryExistence}) => {
  return (
    <div className="p-1">
      {/* Title */}
      <h2 className="head-title-wrokout">Create Workout</h2>
      <div className="rounded mt-1 mb-4" style={{ width: "130px", height: "4px", backgroundColor: "#53AFE6" }}></div>

      {/* Buttons Container */}
      <div className="d-flex flex-wrap justify-content-center">
        {workoutCategories.map((category, index) => (
          <div
            key={index}
            className={`d-flex align-items-center px-3 py-2 mr-3 mb-3 works-out-button ${checkCategoryExistence(category) &&'active'}`}
          onClick={()=>{AddDeleteObject(category)}}>
            {/* Category Name */}
            <span className="title-catery">{category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutButtons;
