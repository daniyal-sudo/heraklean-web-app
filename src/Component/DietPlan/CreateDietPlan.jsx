import React, { useState } from 'react';
import axios from 'axios';

import Sidebar from './../Home/Sidebar';
import './../CreateClient/CreateClient.css';
import { Button, Form } from 'react-bootstrap';
import Header from '../CommonComponent/Header';
import DropdownDay from './DropdownDay';

const CreateDietPlan = () => {
  const [dietTitle, setDietTitle] = useState('');
  const [selectedDay, setSelectedDay] = useState('monday'); // Default to Monday
  const [selectedMeal, setSelectedMeal] = useState('meal1');
  const [dayDetails, setDayDetails] = useState({
    monday: { meal1: {}, meal2: {}, meal3: {} },
    tuesday: { meal1: {}, meal2: {}, meal3: {} },
    wednesday: { meal1: {}, meal2: {}, meal3: {} },
    thursday: { meal1: {}, meal2: {}, meal3: {} },
    friday: { meal1: {}, meal2: {}, meal3: {} },
    saturday: { meal1: {}, meal2: {}, meal3: {} },
    sunday: { meal1: {}, meal2: {}, meal3: {} },
  });
  const [mealForm, setMealForm] = useState({
    title: '',
    description: '',
    protein: '',
    calories: '',
    carbs: '',
    fat: '',
  });

  const handleMealFormChange = (e) => {
    const { name, value } = e.target;
    setMealForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSaveMealDetails = () => {
    setDayDetails((prevDetails) => ({
      ...prevDetails,
      [selectedDay]: {
        ...prevDetails[selectedDay],
        [selectedMeal]: { ...mealForm },
      },
    }));
  };

  const handleMealSelect = (meal) => {
    setSelectedMeal(meal);
    setMealForm(dayDetails[selectedDay][meal] || { title: '', description: '', protein: '', calories: '', carbs: '', fat: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dietData = {
      dietTitle,
      ...dayDetails,
    };

    try {
      console.log(dietData);
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5001/api/auth/createDietPlan', dietData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        alert('Diet plan created successfully!');
      } else {
        alert('Something went wrong!');
      }
    } catch (error) {
      console.error(error);
      alert('Error creating diet plan');
    }
  };

  return (
    <div className="home-container">
      <div className="d-flex">
        <Sidebar />
        <div className="content-wrapper d-flex flex-column">
          <Header />

          <div className="container mt-4 mx-4">
            <div className="profile-page">
              <form onSubmit={handleSubmit} className="creative-program">
                <div className="row mt-4 me-3">
                  <p className="custom-header">Create Diet Plan</p>
                  <div className="col-lg-12">
                  <div className="col-lg-12 p-0">
                    <div className="form-group mb-3">
                      <label htmlFor="dietTitle">Diet Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="dietTitle"
                        value={dietTitle}
                        onChange={(e) => setDietTitle(e.target.value)}
                        required
                      />
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-lg-6">
                    {/* <div className="form-group mb-3">
                      <label htmlFor="days">Select Day</label>
                      <Form.Select id="days" value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
                        {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                          <option key={day} value={day}>
                            {day.charAt(0).toUpperCase() + day.slice(1)}
                          </option>
                        ))}
                      </Form.Select>
                    </div> */}
                    <DropdownDay />
                    </div>
                    <div className="col-lg-6 button-section-meals">
                    <div className="d-flex gap-3 meal-button">
                      {['meal1', 'meal2', 'meal3'].map((meal) => (
                        <Button key={meal} variant={selectedMeal === meal ? 'primary' : 'outline-secondary'} onClick={() => handleMealSelect(meal)}>
                          {meal.charAt(0).toUpperCase() + meal.slice(1)}
                        </Button>
                      ))}
                    </div>
                    </div>
                    </div>
                    <div className="row">
                          <div className="col-lg-6">
                            <Form.Group className="mb-3">
                              <Form.Label>Title</Form.Label>
                              <Form.Control
                                type="text"
                                name="title"
                                value={mealForm.title || ''}
                                onChange={handleMealFormChange}
                                required
                              />
                            </Form.Group>
                          </div>
                        <div className="col-lg-6">
                          <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              as="textarea"
                              name="description"
                              value={mealForm.description || ''}
                              onChange={handleMealFormChange}
                              required
                            />
                          </Form.Group>
                        </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Protein</Form.Label>
                      <Form.Control
                        type="number"
                        name="protein"
                        value={mealForm.protein || ''}
                        onChange={handleMealFormChange}
                        required
                      />
                    </Form.Group>
                    </div>
                    <div className="col-lg-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Calories</Form.Label>
                      <Form.Control
                        type="number"
                        name="calories"
                        value={mealForm.calories || ''}
                        onChange={handleMealFormChange}
                        required
                      />
                    </Form.Group>
                    </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                        <Form.Group className="mb-3">
                          <Form.Label>Carbs</Form.Label>
                          <Form.Control
                            type="number"
                            name="carbs"
                            value={mealForm.carbs || ''}
                            onChange={handleMealFormChange}
                            required
                          />
                        </Form.Group>
                        </div>
                        <div className="col-lg-6">
                        <Form.Group className="mb-3">
                          <Form.Label>Fat</Form.Label>
                          <Form.Control
                            type="number"
                            name="fat"
                            value={mealForm.fat || ''}
                            onChange={handleMealFormChange}
                            required
                          />
                        </Form.Group>
                        </div>
                    </div>
                     <div className="crative-button">
                        <Button type="button" className="save-button" onClick={handleSaveMealDetails}>
                          Save Meal Details
                        </Button>
                        <Button type="submit" className="cancel-buuton">
                          Submit Diet Plan
                        </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDietPlan;
