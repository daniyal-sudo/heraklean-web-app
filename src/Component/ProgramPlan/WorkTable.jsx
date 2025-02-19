import React from "react";
import DayDropdown from "../CommonComponent/CustomDropDownPlan";
import { AiOutlineClose } from "react-icons/ai";

const WorkTable = ({ data, onUpdate, selectedButton,onDelete }) => {
  const tableStyle = {
    borderRadius: "13px",
    borderCollapse: "separate",
    borderSpacing: "0",
    overflow: "hidden",
  };
  const handleInputChange = (index, field, event) => {
    const { value } = event.target;
    onUpdate(index, field, value);
  };

  console.log(data, "datadata");

  // Function to handle changes in the selected day
  const handleDayChange = (day) => {
    setSelectedDay(day);
    console.log("Selected Day:", day); // Perform any additional actions, e.g., API calls or updating another state
  };

  const filteredData = data.filter((item) => item.dayName === selectedButton);
  return (
    <div
      className="container"
      style={{
        padding: "0px",
      }}
    >
      {/* <div className="col-6">
        <Form.Group className="mb-4">
          <Form.Label>Days</Form.Label>
          <DayDropdown
            selectedDay={selectedDay}
            handleDayChange={handleDayChange}
          />
        </Form.Group>
      </div> */}
      <div
        className="table-responsive"
        style={{
          overflowY: "auto",
          maxHeight: "220px",
          height: "100%",
        }}
      >
        {filteredData && filteredData.length > 0 ? (
          <table className="table table-bordered" style={tableStyle}>
            <thead className="table-bg">
              <tr>
                <th className="custom-background">Category</th>
                <th className="custom-background">Exercise Name</th>
                <th className="custom-background">Number of sets</th>
                <th className="custom-background">Number of repetitions</th>
                <th className="custom-background">Working load</th>
                <th className="custom-background">Coach notes</th>
                <th className="custom-background">Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={item.category}
                      className="form-control border-0"
                      readOnly
                      placeholder="text"
                      style={{ border: "none" }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.exerciseName}
                      className="form-control border-0"
                      style={{ border: "none" }}
                      onChange={(e) =>
                        handleInputChange(index, "exerciseName", e)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.numberOfSets}
                      className="form-control border-0"
                      style={{ border: "none" }}
                      onChange={(e) =>
                        handleInputChange(index, "numberOfSets", e)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.numberOfRepetitions}
                      className="form-control border-0"
                      style={{ border: "none" }}
                      onChange={(e) =>
                        handleInputChange(index, "numberOfRepetitions", e)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.workingLoad}
                      className="form-control border-0"
                      style={{ border: "none" }}
                      onChange={(e) =>
                        handleInputChange(index, "workingLoad", e)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.coachNotes}
                      className="form-control border-0"
                      style={{ border: "none" }}
                      onChange={(e) =>
                        handleInputChange(index, "coachNotes", e)
                      }
                    />
                  </td>
                  <td>
                  <div
                    onClick={()=>{
                      onDelete(item)
                    }}
                    style={{ cursor: "pointer", fontSize: "24px" }}
                  >
                    <AiOutlineClose />
                  </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="noPlanFound">Add Exercises first</div>
        )}
      </div>
    </div>
  );
};

export default WorkTable;
