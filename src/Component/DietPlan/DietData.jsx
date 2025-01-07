import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Dropdown } from "react-bootstrap";
import { api_url, calculateCalories } from "../../../CommonFunctions";
import CreateClient from "../CreateClient/CreateClient";
import CreateDietPlan from "./CreateDietPlan";
import axiosInstance from "../../Healpers/axiosInstance";
import Spinner from "../Loader/Spinner";

const DietPlans = () => {
  const [diets, setDiets] = useState([]);
  const [selectedDiet, setSelectedDiet] = useState(null);
  const [showComponent, setShowComponent] = useState("");
  const [selectedDietForEdit, setSelectedDietForEdit] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  // Fetch diets from API
  useEffect(() => {
    setShowLoader(true);
    const fetchDiets = async () => {
      try {
        const response = await axiosInstance.post("/getTrainerDietPlans", {
          trainerId: localStorage.getItem("trainerId"),
        });

        const fetchedPrograms = response.data.dietPlans;
        setDiets(fetchedPrograms);

        // Default to first program and Monday data

        setDiets(response.data.dietPlans);
        setShowLoader(false);
      } catch (error) {
        console.error("Error fetching diets:", error);
      }
    };
    fetchDiets();
  }, [showComponent]);

  // Handle day click
  // const handleDayClick = (day, diet) => {
  //   setSelectedDay(diet[day]);
  //   setSelectedDiet(diet.dietTitle);
  // };

  // Handle program change

  function capitalizeWords(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <>
      {showComponent === "createDietPlan" ? (
        <CreateDietPlan
          onClose={() => {
            setShowComponent("");
          }}
        />
      ) : showComponent === "editDietPlan" && selectedDiet.meals ? (
        <CreateDietPlan
          onClose={() => {
            setShowComponent("");
          }}
          editPlan={selectedDiet}
        />
      ) : (
        <div
          className="container m-0"
          style={{ padding: "30px", maxWidth: "100%", height: "100%", }}
        >
          <div className="diet-plan-section-page">
            <div className="row my-2">
              <div className="col-lg-6">
                <h2 className="custom-head">Diet Plans</h2>
              </div>
              <div className="col-lg-6">
                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setShowComponent("createDietPlan");
                    }}
                  >
                    <div className="plus-icon mr-2">
                      <Link>
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M7.10513 1.11661C12.5194 0.516469 17.9834 0.516469 23.3976 1.11661C26.3954 1.45261 28.8139 3.81336 29.1656 6.82161C29.8079 12.3131 29.8079 17.8607 29.1656 23.3521C28.8139 26.3604 26.3954 28.7211 23.3976 29.0571C17.9834 29.6574 12.5194 29.6574 7.10513 29.0571C4.10738 28.7211 1.68888 26.3604 1.33713 23.3521C0.694915 17.8612 0.694915 12.3142 1.33713 6.82336C1.51505 5.36188 2.1813 4.00331 3.22789 2.96784C4.27448 1.93236 5.64009 1.28066 7.10338 1.11836M15.2514 6.34911C15.5995 6.34911 15.9333 6.48739 16.1795 6.73353C16.4256 6.97967 16.5639 7.31351 16.5639 7.66161V13.7744H22.6766C23.0247 13.7744 23.3586 13.9126 23.6047 14.1588C23.8509 14.4049 23.9891 14.7388 23.9891 15.0869C23.9891 15.435 23.8509 15.7688 23.6047 16.0149C23.3586 16.2611 23.0247 16.3994 22.6766 16.3994H16.5639V22.5121C16.5639 22.8602 16.4256 23.194 16.1795 23.4402C15.9333 23.6863 15.5995 23.8246 15.2514 23.8246C14.9033 23.8246 14.5694 23.6863 14.3233 23.4402C14.0772 23.194 13.9389 22.8602 13.9389 22.5121V16.3994H7.82613C7.47803 16.3994 7.1442 16.2611 6.89805 16.0149C6.65191 15.7688 6.51363 15.435 6.51363 15.0869C6.51363 14.7388 6.65191 14.4049 6.89805 14.1588C7.1442 13.9126 7.47803 13.7744 7.82613 13.7744H13.9389V7.66161C13.9389 7.31351 14.0772 6.97967 14.3233 6.73353C14.5694 6.48739 14.9033 6.34911 15.2514 6.34911Z"
                            fill="white"
                          />
                        </svg>
                      </Link>
                    </div>
                    <Link className="text-white text-decoration-none">
                      Add Diet Plan
                    </Link>
                  </button>
                </div>
              </div>
            </div>
            <div className="diet-plan-section-pages scroll_dietPlan">
              {/* Show selected day and meal details */}
              {diets && diets.length > 0 ? (
                diets.map((item, index) => {
                  const calculation = calculateCalories(item.meals);
                  console.log("ddddd", calculation);
                  // Calculate totals for each diet
                  return (
                    <div className="card diet-plan-section" key={index}>
                      <div className="d-flex justify-content-between align-items-start">
                        <div className="d-flex align-items-start">
                          <img
                            src="/meal.png"
                            alt="Diet Plan Image"
                            className="meal"
                            width="80"
                            height="80"
                          />
                          <div className="ms-3">
                            <h5 className="fw-bold mb-4">{item.dietTitle}</h5>
                            <div className="d-flex flex-wrap">
                              {/* Display Protein, Fats, Carbs for the entire diet */}

                              <div className="meal-info">
                                <span className="badge bg-success  me-1 mb-1">
                                  {`Protein${calculation.Protein}`}
                                </span>

                                <span
                                  className="badge  me-1 mb-1"
                                  style={{
                                    backgroundColor: "#9F02FF",
                                  }}
                                >
                                  {`Carbs${calculation.Carbs}`}
                                </span>

                                <span className="badge bg-danger me-1 mb-1">
                                  {`Fats${calculation.Fats}`}
                                </span>
                                <span className="badge bg-warning  me-1 mb-1">
                                  {`Calories${calculation.Calories}`}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className="d-flex icon"
                          id="diet-icon-hide"
                          onClick={() => {
                            setSelectedDiet(item);
                            setShowComponent("editDietPlan");
                          }}
                        >
                          <button className="btn btn-secondary btn-sm me-2">
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button className="btn btn-primary btn-sm">
                            <i className="bi bi-send"></i>
                          </button>
                        </div>
                      </div>

                      <div className="row mt-3">
                        {/* Dynamically display each meal's title */}
                        {item.meals.slice(0, 3).map((meal, i) => (
                          <div
                            className="col-12 col-md-4"
                            key={`meal-col-${i}`}
                          >
                            <h6>{meal.title}</h6>
                            <ul className="list-unstyled">
                              <li className="meal-list-item">
                                {meal.protein
                                  .map((protein, j) => protein.name)
                                  .join(", ")}
                              </li>
                              <li className="meal-list-item">
                                {meal.carbs
                                  .map((carb, j) => carb.name)
                                  .join(", ")}
                              </li>
                              <li className="meal-list-item">
                                {meal.fats.map((fat, j) => fat.name).join(", ")}
                              </li>
                            </ul>
                          </div>
                        ))}
                      </div>

                      <div className="d-none">
                        <button
                          className="btn btn-secondary btn-sm me-2"
                          onClick={() => {
                            setSelectedDiet(item);
                            setShowComponent("editDietPlan");
                          }}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-primary btn-sm">
                          <i className="bi bi-send"></i>
                        </button>
                      </div>

                      {/* Display the total calories and macronutrients (protein, carbs, fats) */}
                    </div>
                  );
                })
              ) : (
                <div className="text-center record-image no-record-found-h">
                  {showLoader ? (
                    <Spinner />
                  ) : (
                    <img
                      src="/no-event.jpg"
                      style={{ width: "130px" }}
                      alt="No record found"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DietPlans;
