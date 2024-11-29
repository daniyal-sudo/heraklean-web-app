import React from "react";

const WorkTable = () => {
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
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Category</th>
            <th>Exercise Name</th>
            <th>Number of sets</th>
            <th>Number of repetitions</th>
            <th>Working load</th>
            <th>Coach notes</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.category}</td>
              <td>{item.exercise}</td>
              <td>{item.sets}</td>
              <td>{item.repetitions}</td>
              <td>{item.workingLoad}</td>
              <td>{item.coachNotes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkTable;
