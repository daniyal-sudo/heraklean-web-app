import React, { useState,useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MdModeEdit } from "react-icons/md";

import { Modal, Button, Form } from 'react-bootstrap';
import Sidebar from './../Home/Sidebar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../CommonComponent/Header';
import { MdKeyboardArrowRight } from "react-icons/md";
import { api_url } from '../../../CommonFunctions';
import WeightGraphChart from './WeightGraphChart';
const UpdateMealPlanModal = ({ show, handleClose, clientId, fetchClientData, currentMealPlan }) => {
  const [mealPlanData, setMealPlanData] = useState({
    dietTitle: '',
    monday: { meal1: {}, meal2: {}, meal3: {} },
    tuesday: { meal1: {}, meal2: {}, meal3: {} },
    wednesday: { meal1: {}, meal2: {}, meal3: {} },
    thursday: { meal1: {}, meal2: {}, meal3: {} },
    friday: { meal1: {}, meal2: {}, meal3: {} },
    saturday: { meal1: {}, meal2: {}, meal3: {} },
    sunday: { meal1: {}, meal2: {}, meal3: {} },
  });

  const [selectedDay, setSelectedDay] = useState('monday');

  useEffect(() => {
    if (currentMealPlan) {
      setMealPlanData(currentMealPlan);
    }
  }, [currentMealPlan, show]);

  const handleMealChange = (e, day, meal) => {
    const { name, value } = e.target;
    setMealPlanData((prevData) => ({
      ...prevData,
      [day]: {
        ...prevData[day],
        [meal]: {
          ...prevData[day][meal],
          [name]: value,
        },
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${api_url}updateActiveNutrition/${clientId}`,
        mealPlanData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        alert('Active meal plan updated successfully');
        fetchClientData();
        handleClose();
      }
    } catch (error) {
      console.error('Error updating active meal plan', error);
      alert('Failed to update meal plan. Please try again.');
    }
  };

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <Modal show={show} onHide={handleClose} size="lg" id='calendar-modal'>
      <Modal.Header closeButton>
        <Modal.Title>Update Active Meal Plan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="dietTitle">
            <Form.Label>Diet Title</Form.Label>
            <Form.Control
              type="text"
              name="dietTitle"
              value={mealPlanData.dietTitle}
              onChange={(e) => setMealPlanData({ ...mealPlanData, dietTitle: e.target.value })}
              placeholder="Enter diet title"
            />
          </Form.Group>

          <div className="d-flex mb-3 mt-3">
            {days.map((day) => (
              <Button
                key={day}
                variant={selectedDay === day ? 'primary' : 'secondary'}
                onClick={() => setSelectedDay(day)}
                className="me-2 btn btn-sm"
              >
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </Button>
            ))}
          </div>

          <h5>{selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}</h5>

          {['meal1', 'meal2', 'meal3'].map((meal) => (
            <div key={meal}>
              <h6>{meal.charAt(0).toUpperCase() + meal.slice(1)}</h6>
              <Form.Group controlId={`${selectedDay}-${meal}-description`}>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={mealPlanData[selectedDay][meal].description || ''}
                  onChange={(e) => handleMealChange(e, selectedDay, meal)}
                  placeholder={`Enter description for ${meal}`}
                />
              </Form.Group>
              <Form.Group controlId={`${selectedDay}-${meal}-protein`}>
                <Form.Label>Protein</Form.Label>
                <Form.Control
                  type="number"
                  name="protein"
                  value={mealPlanData[selectedDay][meal].protein || ''}
                  onChange={(e) => handleMealChange(e, selectedDay, meal)}
                  placeholder={`Enter protein for ${meal}`}
                />
              </Form.Group>
              <Form.Group controlId={`${selectedDay}-${meal}-calories`}>
                <Form.Label>Calories</Form.Label>
                <Form.Control
                  type="number"
                  name="calories"
                  value={mealPlanData[selectedDay][meal].calories || ''}
                  onChange={(e) => handleMealChange(e, selectedDay, meal)}
                  placeholder={`Enter calories for ${meal}`}
                />
              </Form.Group>
              <Form.Group controlId={`${selectedDay}-${meal}-carb`}>
                <Form.Label>Carbs</Form.Label>
                <Form.Control
                  type="number"
                  name="carb"
                  value={mealPlanData[selectedDay][meal].carb || ''}
                  onChange={(e) => handleMealChange(e, selectedDay, meal)}
                  placeholder={`Enter carbs for ${meal}`}
                />
              </Form.Group>
              <Form.Group controlId={`${selectedDay}-${meal}-fat`}>
                <Form.Label>Fat</Form.Label>
                <Form.Control
                  type="number"
                  name="fat"
                  value={mealPlanData[selectedDay][meal].fat || ''}
                  onChange={(e) => handleMealChange(e, selectedDay, meal)}
                  placeholder={`Enter fat for ${meal}`}
                />
              </Form.Group>
            </div>
          ))}

          <Button variant="primary" type="submit" className="mt-3">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};


const UpdatePlanModal = ({ show, handleClose, clientId, fetchClientData, currentPlan }) => {
  const [planData, setPlanData] = useState({
    programTitle: '',
    monday: { title: '', description: '', modules: [], duration: '' },
    tuesday: { title: '', description: '', modules: [], duration: '' },
    wednesday: { title: '', description: '', modules: [], duration: '' },
    thursday: { title: '', description: '', modules: [], duration: '' },
    friday: { title: '', description: '', modules: [], duration: '' },
    saturday: { title: '', description: '', modules: [], duration: '' },
    sunday: { title: '', description: '', modules: [], duration: '' },
  });

  const [selectedDay, setSelectedDay] = useState('monday');

  useEffect(() => {
    if (currentPlan) {
      setPlanData(currentPlan);
    }
  }, [currentPlan, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlanData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDayChange = (e, day) => {
    const { name, value } = e.target;
    setPlanData((prevData) => ({
      ...prevData,
      [day]: {
        ...prevData[day],
        [name]: name === 'modules' ? value.split(',').map(module => module.trim()) : value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${api_url}updateActivePlan/${clientId}`,
        planData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        alert('Active plan updated successfully');
        fetchClientData();
        handleClose();
      }
    } catch (error) {
      console.error('Error updating active plan', error);
      alert('Failed to update plan. Please try again.');
    }
  };

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <Modal show={show} onHide={handleClose} size="lg" id='calendar-modal'>
      <Modal.Header closeButton>
        <Modal.Title>Update Active Plan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="programTitle">
            <Form.Label>Program Title</Form.Label>
            <Form.Control
              type="text"
              name="programTitle"
              value={planData.programTitle}
              onChange={handleChange}
              placeholder="Enter new program title"
            />
          </Form.Group>

          <div className="d-flex mb-3 mt-3 common-button">
            {days.map((day) => (
              <Button
                key={day}
                variant={selectedDay === day ? 'primary' : 'secondary'}
                onClick={() => setSelectedDay(day)}
                className="me-2 btn btn-sm"
              >
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </Button>
            ))}
          </div>

          <h5>{selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}</h5>

          <Form.Group controlId={`${selectedDay}-title`}>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={planData[selectedDay].title}
              onChange={(e) => handleDayChange(e, selectedDay)}
              placeholder={`Enter ${selectedDay} title`}
            />
          </Form.Group>

          <Form.Group controlId={`${selectedDay}-description`}>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={planData[selectedDay].description}
              onChange={(e) => handleDayChange(e, selectedDay)}
              placeholder={`Enter ${selectedDay} description`}
            />
          </Form.Group>

          <Form.Group controlId={`${selectedDay}-modules`}>
            <Form.Label>Modules (comma separated)</Form.Label>
            <Form.Control
              type="text"
              name="modules"
              value={planData[selectedDay].modules.join(', ')}
              onChange={(e) => handleDayChange(e, selectedDay)}
              placeholder={`Enter ${selectedDay} modules`}
            />
          </Form.Group>

          <Form.Group controlId={`${selectedDay}-duration`}>
            <Form.Label>Duration</Form.Label>
            <Form.Control
              type="text"
              name="duration"
              value={planData[selectedDay].duration}
              onChange={(e) => handleDayChange(e, selectedDay)}
              placeholder={`Enter ${selectedDay} duration`}
            />
          </Form.Group>

          <Button variant="primary mt-3" type="submit">
            Update Plan
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
const ClientHeader = ({ trainerName, clientName }) => (
  <header className="d-flex justify-content-between align-items-center p-3 bg-light">
    <div>
      <h1>{trainerName}</h1>
      <h2>{clientName}</h2>
    </div>
  </header>
);

const ClientInfo = ({ name, status, image }) => {
  // Construct the full image URL
  const imageUrl = image ? `http://82.112.240.94:5001/${image.replace(/\\/g, '/')}` : 'default_image.png'; // Use default image if no image is available

  return (
    <div className="d-flex align-items-center mb-4">
      <img 
        src="/p-2.png" 
        alt={name} 
        className="me-3 profile-img" 
        style={{ width: '162px', height: '162px', objectFit: 'cover' }} 
      />
          
      <div>
        <h2 className="head-profile-client">{name}</h2>
        <p className="custom-p mb-0">Status:<span className="custom-bold">{status}</span></p>
      </div>
      {/* hamid */}
      {/* <div className="card mb-4">
                      <div className="card-body">
                        <h5 className="card-title">Monthly Payment Amount</h5>
                        <h2 className="text-primary">${clientData.paymentAmount}</h2>
                      </div>
            </div> */}
    </div>
  );
};

const WeightGraph = ({ data }) => (
  <div className="card-weight mb-4">
    <div className="card-body">
      <h5 className="custom-h">Weight Graph</h5>
      <ResponsiveContainer width="100%" height={200}>
        {/* <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="weight" stroke="#8884d8" />
        </LineChart> */}
         <WeightGraphChart />
      </ResponsiveContainer>
    </div>
  </div>
);

const Measurements = ({ measurements }) => (
  <div className="card-weight mb-4">
    <div className="card-body">
      <h5 className="custom-h">Measurements</h5>
      <div className="row">
        {Object.entries(measurements).map(([key, value]) => (
          <div key={key} className="col-6 mb-2">
            <strong className="bold-string">{key}:</strong> {value}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Membership = ({ plan, expiresOn }) => (
  <div className="card-weight">
    <div className="card-body">
      <h5 className="custom-h">Membership</h5>
      <p className="mb-0 custom-h-1">{plan}</p>
      <small className="custom-p-1">Expires on: {expiresOn}</small>
    </div>
  </div>
);


const ActivePlans = ({ activePlans, activeMealPlans, selectedDay, setSelectedDay, selectedMeal, setSelectedMeal, fetchClientData, clientId }) => {
  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const [showModal, setShowModal] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentMeal, setCurrentMeal] = useState(null);

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="card mb-2 profile-section-meal">
          <div className="card-body p-0">
            <div className="flex" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: "relative", marginBottom: "20px" }}>
            <h5 className="head-profile-2">
              Active Plans
            </h5>
                <div className="text-end">
                        <a href="/view-all" className="view-all">View All</a>
                    </div>
                </div>
                <div className="card-space">
            <div className="mb-3">
              <label htmlFor="mealSelect" className="form-label">Select Meal Day:</label>
              <select
                id="mealSelect"
                className="form-select"
                value={selectedMeal}
                onChange={(e) => setSelectedMeal(e.target.value)}
              >
                {daysOfWeek.map((day) => (
                  <option key={day} value={day}>
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            {activePlans.map((plan) => (
              <div key={plan._id} className="mb-3">
                <span className='d-flex justify-content-end'>
                  <MdModeEdit 
                    onClick={() => {
                      setCurrentPlan(plan);
                      setShowModal(true);
                    }} 
                  />
                </span>
                {/* <h6>{plan[selectedMeal].programTitle}</h6> */}
                <p className="para-2">{plan[selectedMeal].title}</p>
                {plan[selectedMeal] && (
                  <>
                    <p className="para-2 ">{plan[selectedMeal].description}</p>
                    {plan[selectedMeal].modules && (
                      <ul>
                        {plan[selectedMeal].modules.map((module, i) => (
                          <li className="para-2" key={i}>{module}</li>
                        ))}
                      </ul>
                    )}
                    <p>Duration: {plan[selectedMeal].duration}</p>
                  </>
                )}
                <a href="#" className="btn btn-outline-primary btn-sm active-button">Active</a>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="card mb-2 profile-section-meal">
          <div className="card-body">
          <div className="flex" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: "relative", marginBottom: "20px" }}>
                  <h5 className="head-profile-2">
                    Active Meal Plans
                  </h5>
                  <div className="text-end">
                              <a href="/view-all" className="view-all">View All</a>
                  </div>
            </div>
                
            <div className="card-space">
            <div className="mb-3">
              <label htmlFor="mealSelect" className="form-label">Select Day:</label>
              <select
                id="mealSelect"
                className="form-select"
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
              >
                {daysOfWeek.map((day) => (
                  <option key={day} value={day}>
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            {activeMealPlans.map((plan, index) => (
              <div key={index}>
                
                <h6 className="para-2">{plan.dietTitle}</h6>
                <span className='d-flex justify-content-end para-2'>
                  <MdModeEdit 
                    onClick={() => {
                      setCurrentMeal(plan);
                      setShowEditModal(true);
                    }} 
                  />
                </span>
                {plan[selectedDay] && Object.entries(plan[selectedDay]).map(([meal, details]) => (
                  <div key={meal}>
                    <strong className="para-2">{meal}</strong>
                    <p className="para-2">{details.description}</p>
                    <ul className="mb-0">
                      <li className="para-2">Protein: {details.protein}g</li>
                      <li className="para-2">Calories: {details.calories}</li>
                      <li className="para-2">Carbs: {details.carb}g</li>
                      <li className="para-2">Fat: {details.fat}g</li>
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>

      {/* ... (keep the meal plans section) */}

      {showModal && (
        <UpdatePlanModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          clientId={clientId}
          fetchClientData={fetchClientData}
          currentPlan={currentPlan}
        />
      )}

{showEditModal && (
  <UpdateMealPlanModal
    show={showEditModal}
    handleClose={() => setShowEditModal(false)}
    clientId={clientId}
    fetchClientData={fetchClientData}
    currentMealPlan={currentMeal} // Update this to currentMealPlan
  />
)}
    </div>
  );
};

const ClientProfile = ({ clientData, selectedDay, setSelectedDay, selectedMeal, setSelectedMeal, fetchClientData, clientId }) => {
  return (
    <div className="home-container"> 
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Header trainerName={clientData.trainer.Fname} clientName={clientData.fullname} />
        <div className="container m-0" style={{ padding: '30px', maxWidth: '100%' }}>
          <div className="profile-section mb-4">
          <div className="d-flex justify-content-between align-items-center p-3 relative-parent">
              <h5 className="head-profiles">Client Profile</h5>
              <a href="#" className="text-primary">
                2 Notifications <span><MdKeyboardArrowRight /></span>
              </a>
        </div>
                <ClientInfo name={clientData.fullname} status={clientData.status} image={clientData.profilePic} />
                 
                <div className="row">
                  <div className="col-md-6">
                    <WeightGraph data={clientData.weightGraph} />
                  
                  </div>
                  <div className="col-md-6">
                  
                    <Measurements measurements={clientData.measurements} />
                    <Membership plan={clientData.membership.name} expiresOn={clientData.membership.expiresOn} />
                  </div>
                </div>
          </div>



          {/* hamid */}
     
            <ActivePlans 
                      activePlans={clientData.activePlans}
                      activeMealPlans={clientData.activeMealPlans}
                      selectedDay={selectedDay}
                      setSelectedDay={setSelectedDay}
                      selectedMeal={selectedMeal}
                      setSelectedMeal={setSelectedMeal}
                      fetchClientData={fetchClientData}
                      clientId={clientId}
                    />

            </div>
      </div>
    </div>
    </div>
  );
};

const SingleClient = () => {
  const { clientId } = useParams();
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDay, setSelectedDay] = useState('monday');
  const [selectedMeal, setSelectedMeal] = useState('monday');

  const fetchClientData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${api_url}getClientOverview/${clientId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.data.success) {
        setClientData(response.data.client);
      } else {
        setError('Failed to fetch client data');
      }
    } catch (err) {
      setError('An error occurred while fetching the client data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientData();
  }, [clientId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return clientData ? (
    <ClientProfile 
      clientData={clientData} 
      selectedDay={selectedDay}
      setSelectedDay={setSelectedDay}
      selectedMeal={selectedMeal}
      setSelectedMeal={setSelectedMeal}
      fetchClientData={fetchClientData}
      clientId={clientId}
    />
  ) : <p>No client data available.</p>;
};
export default SingleClient;


