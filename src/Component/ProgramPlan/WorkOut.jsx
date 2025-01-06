import React, { useState } from "react";
import WorkoutButtons from "../DietPlan/WorkoutButtons";
import WorkTable from "./WorkTable";
import TwoButtons from "../DietPlan/TwoButtons";
import PlusMinusButtons from "./PlusMinusButtons";
import Dropdown from "react-bootstrap/Dropdown";
import { FaPlus, FaMinus } from "react-icons/fa";

import CustomSlider from "./CustomSlider";
import IconDropdown from "../DietPlan/IconDropdown";
import { TestObject } from "../../../CommonFunctions";
import { errorMessage } from "../../Toast/Toast";

const WorkOut = ({
  onBack,
  tableData,
  setTableData,
  handleSubmit,
  dayForm,
}) => {
  const [selectedItem, setSelectedItem] = useState("Chest");
  const [selectedButton, setSelectedButton] = useState(1);
  const [days, setDays] = useState([1]);
  const [search, setSearch] = useState('');
  const [exercises, setExercises] = useState(TestObject[0].exercises);
  // onClose()

  const handleSelect = (item) => {
    setSelectedItem(item.category);
    setExercises(item.exercises); // Select kiya hua item update karein
  };
  const updateData = (index, field, value) => {
    setTableData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index][field] = value;
      return updatedData;
    });
  };


  const generateRandomId = () => {
    return '_' + Math.random().toString(36).substr(2, 9); 
  };
  const AddObject = (exercise) => {
    console.log('selectedItem:', selectedItem);
    console.log('days:', days);
    console.log('exercise:', exercise);
  
   
  
    setTableData((prevData) => {
      return [
        ...prevData,
        {
          category: selectedItem,
          exerciseName: exercise,
          numberOfSets: 0,
          numberOfRepetitions: 0,
          workingLoad: 0,
          coachNotes: "",
          dayName: selectedButton,
          uniqueid:generateRandomId(),
        },
      ];
    });
  };
  
  const buttonContainerStyle = {
    justifyContent: "flex-end",
  };


  const addDay = () => {
    setDays((prevDays) => [...prevDays, prevDays.length + 1]);
  };

  // Function to delete the last day
  const deleteDay = () => {
    if (days.length > 1) {
      const deletedDay = days[days.length - 1];
      setDays((prevDays) => prevDays.slice(0, -1));
  
      setTableData((prevData) => {
        // Filter out the items where dayName matches the one you want to delete
        return prevData.filter(item => item.dayName !== deletedDay);
      });
    } else {
      errorMessage('One day is required');
    }
  };

  const onDelete = (data) => {
    setTableData((prevData) => {
      return prevData.filter((item) => {
        // First, check if the _id matches, otherwise check if uniqueid matches
        if (data._id && item._id === data._id) {
          return false; // Don't include this item (it will be deleted)
        } else if (data.uniqueid && item.uniqueid === data.uniqueid) {
          return false; // Don't include this item (it will be deleted)
        }
        return true; // Keep the item if it doesn't match
      });
    });
  };
  console.log(tableData)
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="diet-plan-section-page">
            <div className="p-section">
              <div className="row">
                <div className="col-md-7">
                  <div className="workout-section">
                    <div className="work-title-2">
                      {/* Title */}
                      <h2 className="head-title-wrokout">
                        {dayForm.id ? "Edit" : "Create"} Workout
                      </h2>
                      <div
                        className="rounded mt-1 mb-4"
                        style={{
                          width: "130px",
                          height: "4px",
                          backgroundColor: "#53AFE6",
                        }}
                      ></div>
                    </div>
                    <div className="fliter-dropdown">
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="info"
                          id="dropdown-basics"
                          className="rounded-pill text-white"
                        >
                          {selectedItem}
                          <IconDropdown />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {TestObject.map((item, index) => (
                            <Dropdown.Item
                              key={index}
                              onClick={() => handleSelect(item)}
                            >
                              {item.category}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="justify-content-center mt-3">
                    <div className="search-work">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search Here"
                        aria-label="Search"
                        value={search}
                        onChange={(e)=>{
                          setSearch(e.target.value)
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 p-0">
                  <div className="custom-slider-section">
                    <CustomSlider
                      selectedItem={exercises}
                      search={search}
                      AddObject={AddObject}
                    />
                  </div>
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
            {/* <WorkoutButtons 
            name= {dayForm.id ? 'Edit':'Create'}
            
            
            AddDeleteObject={AddDeleteObject} checkCategoryExistence={checkCategoryExistence}/> */}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12  mt-3">
          <div
            className="diet-plan-section-page"
            style={{
              height: "100%",
            }}
          >
            <div className="container">
              <div className="row mb-2">
                <div className="col-md-12 single-button">
                  <h2 class="head-title-wrokout">Days</h2>
                </div>
              </div>
              <div className="row mb-4 diet-button-exersice">
                <div className="col-md-9">
                  <div className="button-container" id="two-button">
                  {days.map((day, index) => (
                    <button
                    key={index}
                      className={`custom-button ${
                        selectedButton === day ? "active" : ""
                      }`}
                      onClick={()=>{setSelectedButton(day)}}
                    >
                      Day {day}
                    </button>))}
                  </div>
                </div>
                <div className="col-md-3 button-combine">
                  <h2 class="head-title-wrokouts" id="hide-buttons2">
                    Days
                  </h2>
                  <div
                    className="button-container"
                    style={buttonContainerStyle}
                  >
                    <button className="icon-button"
                    onClick={addDay}>
                      <FaPlus />
                    </button>
                    <button className="icon-button"
                    onClick={deleteDay}>
                      <FaMinus />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <WorkTable data={tableData} onUpdate={updateData} selectedButton={selectedButton} 
            onDelete={onDelete}/>
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
        <button
          type="button"
          class="save-button btn btn-primary"
          onClick={handleSubmit}
        >
          {dayForm.id ? "Edit" : "Create"}
        </button>
      </div>
    </>
  );
};

export default WorkOut;
