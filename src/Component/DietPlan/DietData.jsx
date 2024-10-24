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
      
        <div className="container">
        <div className="diet-plan-section-page">
          <div className="row my-2">
        <div className="col-lg-6">

          <h2 className="custom-head">Diet Plans</h2>
        </div>
        <div className="col-lg-6">

          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" >
            <img src="/plus.png" className="plus-icon mr-2"alt="img"/>
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
  
          <div className="row">
            <div className="col-12">
            <div className="card diet-plane-2">
              <h4 className="fw-bold">{selectedDiet}</h4>

              {["meal1", "meal2", "meal3"].map((meal, index) => (
                selectedDay[meal] && (
                  // <div key={index} className="mt-3">
                  //   <h5 className="fw-bold"><strong>{meal}:</strong> {selectedDay[meal].title}</h5>
                  //   <p>{selectedDay[meal].description}</p>
                  //   <div className="row ">
                  //     <div className="col-3">

                  //   <button className="btn btn-outline-danger"><strong>Protein:</strong> {selectedDay[meal].protein}g</button>
                  //     </div>
                  //     <div className="col-3">

                  //   <button className="btn btn-outline-primary"><strong>Calories:</strong> {selectedDay[meal].calories} kcal</button>
                  //     </div>
                  //     <div className="col-3">

                  //   <button className="btn btn-outline-success"><strong>Fat:</strong> {selectedDay[meal].fat}g</button>
                  //     </div>
                  //   </div>
                  // </div>
                  <div className="card diet-plan-section">
                  <div className="d-flex justify-content-between align-items-start" key={index}>
                  
                    <div className="d-flex align-items-start">
                      <img src="/meal.png" alt="Diet Plan Image" className="meal" width="80" height="80"/>
                      <div className="ms-3">
                        <h5 className="fw-bold mb-4">{selectedDay[meal].title}</h5>
                       
                        <div className="d-flex flex-wrap">
                          <span className="badge bg-danger me-1 mb-1">{selectedDay[meal].protein}</span>
                          <span className="badge bg-success me-1 mb-1">{selectedDay[meal].calories} kcal</span>
                          <span className="badge bg-warning text-dark me-1 mb-1">{selectedDay[meal].fat}g</span>
                          <span className="badge bg-secondary me-1 mb-1">Fats 200g</span>
                        </div>
                      </div>
                    </div>
                
                  
                    <div className="d-flex">
                      <button className="btn btn-secondary btn-sm me-2">
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="btn btn-primary btn-sm">
                        <i className="bi bi-send"></i>
                      </button>
                    </div>
                  </div>
                
                  <div className="row mt-3">
                    <div className="col-12 col-md-4">
                      <h6>Meal 1</h6>
                      <ul className="list-unstyled">
                        <li className="meal-list-item">{selectedDay[meal].title}</li>
                        <li className="meal-list-item">{selectedDay[meal].title}</li>
                      </ul>
                    </div>
                    <div className="col-12 col-md-4">
                      <h6>Meal 2</h6>
                      <ul className="list-unstyled">
                        <li className="meal-list-item">{selectedDay[meal].title}</li>
                        <li className="meal-list-item">{selectedDay[meal].title}</li>
                      </ul>
                    </div>
                    <div className="col-12 col-md-4">
                      <h6>Meal 3</h6>
                      <ul className="list-unstyled">
                        <li className="meal-list-item">{selectedDay[meal].title}</li>
                        <li className="meal-list-item">{selectedDay[meal].title}</li>
                      </ul>
                    </div>
                  </div>
                </div>
                )
              ))}
            </div>
        </div>
        </div>
      )}
    </div>
    </div>
              </>
  );
};

export default DietPlans;
