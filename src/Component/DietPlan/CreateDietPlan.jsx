import React, { useState } from 'react';
import axios from 'axios';

import Sidebar from './../Home/Sidebar';
import './../CreateClient/CreateClient.css';
import { Button, Form } from 'react-bootstrap';
import Header from '../CommonComponent/Header';

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

          <div className="container mt-2 mx-4">
            <div className="bg-white p-4 rounded" style={{ border: '1px solid #E5E5E5' }}>
              <form onSubmit={handleSubmit}>
                <div className="row mt-4 me-3">
                  <p className="fs-4 fw-bold">Create Diet Plan</p>
                  <div className="col-lg-6">
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

                    <div className="form-group mb-3">
                      <label htmlFor="days">Select Day</label>
                      <Form.Select id="days" value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
                        {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                          <option key={day} value={day}>
                            {day.charAt(0).toUpperCase() + day.slice(1)}
                          </option>
                        ))}
                      </Form.Select>
                    </div>

                    <div className="d-flex gap-3 mb-3">
                      {['meal1', 'meal2', 'meal3'].map((meal) => (
                        <Button key={meal} variant={selectedMeal === meal ? 'primary' : 'outline-secondary'} onClick={() => handleMealSelect(meal)}>
                          {meal.charAt(0).toUpperCase() + meal.slice(1)}
                        </Button>
                      ))}
                    </div>

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

                    <Button type="button" className="btn btn-primary" onClick={handleSaveMealDetails}>
                      Save Meal Details
                    </Button>
                    <Button type="submit" className="btn btn-primary mt-2">
                      Submit Diet Plan
                    </Button>
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
