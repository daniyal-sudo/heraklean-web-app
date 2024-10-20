import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const DietPlans = () => {
  const [diets, setDiets] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedDiet, setSelectedDiet] = useState(null);

  // Fetch diets from API
  useEffect(() => {
    const fetchDiets = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://82.112.240.94:5001/api/auth/getTrainerDietPlans", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        response.data.dietPlans.forEach(plan => {
          console.log(plan.dietTitle);
        });
        
        setDiets(response.data.dietPlans);
      } catch (error) {
        console.error("Error fetching diets:", error);
      }
    };
    fetchDiets();
  }, []);

  // Handle day click
  const handleDayClick = (day, diet) => {
    setSelectedDay(diet[day]);
    setSelectedDiet(diet.dietTitle);
  };

  return (
    <>
    <div className="container mt-5">
      <div className="row my-2">
    <div className="col-lg-6">

      <h2 className="fw-bold">Diet Plans</h2>
    </div>
    <div className="col-lg-6">

      <div className="d-flex justify-content-end">
        <button className="btn btn-primary" >
          <Link to="/create-diet" className="text-white text-decoration-none">
          Add Diet Plan
          </Link>
          </button>
    </div>
      </div>
      </div>

      <div className="row">
        {diets.map((diet, index) => (
          <div key={index} className="col-md-4 col-sm-6 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="fw-bold">{diet.dietTitle}</h5>

                <div className="d-flex flex-wrap mt-3">
                  {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
                    <button
                      key={day}
                      className="btn btn-outline-primary m-1"
                      onClick={() => handleDayClick(day, diet)}
                    >
                      {day.charAt(0).toUpperCase() + day.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show selected day and meal details */}
      {selectedDay && (
        <div className="card mt-4 p-4 shadow py-2 my-4">
          <h4 className="fw-bold">{selectedDiet}</h4>

          {["meal1", "meal2", "meal3"].map((meal, index) => (
            selectedDay[meal] && (
              <div key={index} className="mt-3">
                <h5 className="fw-bold"><strong>{meal}:</strong> {selectedDay[meal].title}</h5>
                <p>{selectedDay[meal].description}</p>
                <div className="row ">
                  <div className="col-3">

                <button className="btn btn-outline-danger"><strong>Protein:</strong> {selectedDay[meal].protein}g</button>
                  </div>
                  <div className="col-3">

                <button className="btn btn-outline-primary"><strong>Calories:</strong> {selectedDay[meal].calories} kcal</button>
                  </div>
                  <div className="col-3">

                <button className="btn btn-outline-success"><strong>Fat:</strong> {selectedDay[meal].fat}g</button>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      )}
    </div>
              </>
  );
};

export default DietPlans;
