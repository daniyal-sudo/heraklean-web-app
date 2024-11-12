import React, { useState } from "react";
import axios from "axios";
import { TiPlus } from "react-icons/ti";
import { Button, Form } from "react-bootstrap";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { errorMessage, successMessage } from "../../Toast/Toast";
import axiosInstance from "../../Healpers/axiosInstance";
import { useEffect } from "react";

const CreateDietPlan = ({ onClose, editPlan }) => {
  const [dietTitle, setDietTitle] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [MealTabLenght, setMealTabLenght] = useState([
    { id: 1, name: `Meal 1` },
  ]);
  const [meals, setMeals] = useState([
    {
      title: "",
      protein: { name: [], grams: "", id: "0" },
      carbs: { name: [], grams: "" },
      fats: { name: [], grams: "" },
    },
  ]);

  const handleMealFormChange = (index, field, value) => {
    const updatedMeals = [...meals];
    updatedMeals[index][field] = value;
    setMeals(updatedMeals);
  };

  const handleMacroChange = (index, macro, field, value) => {
    setMeals((prevMeals) => {
      const updatedMeals = [...prevMeals];
      const updatedMeal = { ...updatedMeals[index] };
      const updatedMacro = { ...updatedMeal[macro] };

      if (field === "name") {
        // Ensure 'name' is an array before setting it
        updatedMacro.name = Array.isArray(value) ? value : [];
      } else if (field === "grams") {
        updatedMacro.grams = value;
      }

      updatedMeal[macro] = updatedMacro;
      updatedMeals[index] = updatedMeal;
      return updatedMeals;
    });
  };
  useEffect(() => {
    if (editPlan) {
      console.log("Edit Plan:", editPlan); // Log to inspect the data structure
      setDietTitle(editPlan.dietTitle);
      setMeals(
        editPlan.meals.map((meal) => ({
          ...meal,
          protein:
            meal.protein && meal.protein[0]
              ? meal.protein[0]
              : { name: [], grams: "" },
          carbs:
            meal.carbs && meal.carbs[0]
              ? meal.carbs[0]
              : { name: [], grams: "" },
          fats:
            meal.fats && meal.fats[0] ? meal.fats[0] : { name: [], grams: "" },
        }))
      );
      setMealTabLenght(
        editPlan.meals.map((meal, index) => ({
          id: index + 1,
          name: `Meal ${index + 1}`,
        }))
      );
    }
  }, [editPlan]);

  const handleMealSelect = (index) => {
    setSelectedIndex(index);
  };

  const handleAddMeal = () => {
    setMeals([
      ...meals,
      {
        title: "",
        protein: { name: [], grams: "" },
        carbs: { name: [], grams: "" },
        fats: { name: [], grams: "" },
      },
    ]);
    const newMeal = {
      id: MealTabLenght.length + 1,
      name: `Meal ${MealTabLenght.length + 1}`,
    };
    setMealTabLenght([...MealTabLenght, newMeal]);
  };

  const mealsWithIndex = meals[selectedIndex] || {};
  const submit = async () => {
    const dietData = {
      ...(editPlan?._id && { id: editPlan._id }),
      dietTitle,
      meals,
      trainerId: localStorage.getItem("trainerId"),
    };

    try {
      const response = await axiosInstance.post(
        editPlan._id ? "/updateDietPlan" : "/createDietPlan",
        dietData
      );

      if (response.data.success) {
        successMessage(response.data.message);
        onClose();
      } else {
        errorMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
      errorMessage("Error creating diet plan");
    }
  };
  console.log(mealsWithIndex, "mealsWithIndexmealsWithIndex");

  return (
    <div
      className="container m-0"
      style={{ padding: "30px", maxWidth: "100%" }}
    >
      <div className="profile-page">
        <div className="creative-program">
          <div className="row mt-4 me-3">
            <p className="custom-header">
              {editPlan ? "Update" : "Create"} Diet Plan
            </p>
            <div className="col-lg-12">
              <div className="form-group mb-3">
                <label htmlFor="dietTitle">Diet Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="dietTitle"
                  value={dietTitle}
                  onChange={(e) => setDietTitle(e.target.value)}
                />
              </div>
              <div className="col-lg-6 button-section-meals">
                <div className="d-flex gap-3 meal-button">
                  {MealTabLenght.map((meal, index) => (
                    <Button
                      key={meal.id}
                      variant={
                        selectedIndex === index
                          ? "primary"
                          : "outline-secondary"
                      }
                      onClick={() => handleMealSelect(index)}
                    >
                      {meal.name}
                    </Button>
                  ))}
                  <button
                    type="button"
                    className="plus btn btn-secondary"
                    onClick={handleAddMeal}
                  >
                    <TiPlus />
                  </button>
                </div>
              </div>

              {mealsWithIndex && (
                <div className="meal-section">
                  <div className="row">
                    <div className="col-lg-6">
                      <Form.Group className="mb-3">
                        <Form.Label>Meal Title</Form.Label>
                        <Form.Control
                          type="text"
                          name="title"
                          value={mealsWithIndex.title}
                          onChange={(e) =>
                            handleMealFormChange(
                              selectedIndex,
                              "title",
                              e.target.value
                            )
                          }
                        />
                      </Form.Group>
                    </div>
                  </div>

                  {["protein", "carbs", "fats"].map((macro) => (
                    <div className="row" key={macro}>
                      <div className="col-lg-6">
                        <Form.Group className="mb-3">
                          <Form.Label>
                            {macro.charAt(0).toUpperCase() + macro.slice(1)}{" "}
                          </Form.Label>
                          <TagsInput
                            value={
                              (mealsWithIndex && mealsWithIndex[macro]?.name) ||
                              []
                            }
                            onChange={(tags) =>
                              handleMacroChange(
                                selectedIndex,
                                macro,
                                "name",
                                tags
                              )
                            }
                            inputProps={{ placeholder: 'Add' }}
                          />
                        </Form.Group>
                      </div>
                      <div className="col-lg-6">
                        <Form.Group className="mb-3">
                          <Form.Label>
                            {macro.charAt(0).toUpperCase() + macro.slice(1)}{" "}
                            Grams
                          </Form.Label>
                          <Form.Control
                            type="number"
                            name={`${macro}Grams`}
                            value={mealsWithIndex[macro].grams || ""}
                            onChange={(e) =>
                              handleMacroChange(
                                selectedIndex,
                                macro,
                                "grams",
                                e.target.value
                              )
                            }
                          />
                        </Form.Group>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="crative-button">
                <Button className="save-button" onClick={submit}>
                  {editPlan ? "Update" : "Create"}
                </Button>
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDietPlan;
