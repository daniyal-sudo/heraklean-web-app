import React from "react";

const WorkTable = () => {
    const tableStyle = {
        borderRadius: '13px', 
        borderCollapse: 'separate',
        borderSpacing: '0', 
        overflow: 'hidden', 
      };
  const data = [
    {
      category: "XYZ",
      exercise: "Chest",
      sets: 12,
      repetitions: 2,
      workingLoad: 15,
      coachNotes: "XYZ",
    },
    {
      category: "XYZ",
      exercise: "Barbell Bench",
      sets: 10,
      repetitions: 1,
      workingLoad: 10,
      coachNotes: "XYZ",
    },
    // Add more rows here
  ];

  return (
    <div className="container">
      <div className="table-responsive">
        <table className="table table-bordered" style={tableStyle}>
          <thead className="table-bg">
            <tr>
              <th className="custom-background">Category</th>
              <th className="custom-background">Exercise Name</th>
              <th className="custom-background">Number of sets</th>
              <th className="custom-background">Number of repetitions</th>
              <th className="custom-background">Working load</th>
              <th className="custom-background">Coach notes</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={item.category}
                    className="form-control border-0"
                    placeholder="text"
                    style={{ border: "none" }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.exercise}
                    className="form-control border-0"
                    style={{ border: "none" }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.sets}
                    className="form-control border-0"
                    style={{ border: "none" }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.repetitions}
                    className="form-control border-0"
                    style={{ border: "none" }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.workingLoad}
                    className="form-control border-0"
                    style={{ border: "none" }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.coachNotes}
                    className="form-control border-0"
                    style={{ border: "none" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkTable;
