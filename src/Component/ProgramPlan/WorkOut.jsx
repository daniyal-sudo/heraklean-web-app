import React, { useState } from "react";
import WorkoutButtons from "../DietPlan/WorkoutButtons";
import WorkTable from "./WorkTable";


const WorkOut = ({
    onClose,
}) => {

    // onClose()
  const [showComponent, setShowComponent] = useState("");
  return (
   <><div className="row">
    <div className="col-md-12 ">
          <div className="diet-plan-section-page">
              <WorkoutButtons />
          </div>
    </div>
    <div className="col-md-12  mt-5">
          <div className="diet-plan-section-page">
              <WorkTable />
          </div>
         
        </div>
    </div>
 
    <div class="crative-button" id="workout">
    <button type="button" class="btn btn-light">Cancel</button>
    <button type="button" class="save-button btn btn-primary">Create</button>
</div></>
    
  );
};

export default WorkOut;
