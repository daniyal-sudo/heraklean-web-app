import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Form = () => {
  const [dietPlans, setDietPlans] = useState([]);
  const [programPlans, setProgramPlans] = useState([]);
  const [formData, setFormData] = useState({
    fullname: '',
    startingWeight: '',
    attachDietId: [],
    attachProgramId: [],
    subamount: '',
    profilePic: null,
    password: '',
    email: '',
    subscription: 'Active', // Added this field
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      const token = localStorage.getItem('token');
      try {
        const [dietResponse, programResponse] = await Promise.all([
          axios.get('http://82.112.240.94:5001/api/auth/getTrainerDietPlans', {
            headers: { 'Authorization': `Bearer ${token}` },
          }),
          axios.get('http://82.112.240.94:5001/api/auth/getTrainerProgramPlans', {
            headers: { 'Authorization': `Bearer ${token}` },
          })
        ]);
        setDietPlans(dietResponse.data.dietPlans);
        setProgramPlans(programResponse.data.programPlans);
      } catch (error) {
        console.error("Error fetching plans:", error);
        setError("Failed to fetch diet and program plans. Please try again.");
      }
    };

    fetchPlans();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'attachDietId' || id === 'attachProgramId') {
      setFormData({ ...formData, [id]: [value] }); // Wrap the value in an array
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePic: e.target.files[0] });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    // Create FormData object to handle file upload and other form fields
    const formDataToSend = new FormData();
    formDataToSend.append('fullname', formData.fullname);
    formDataToSend.append('startingWeight', Number(formData.startingWeight)); // Send as number
    formDataToSend.append('attachDietId', formData.attachDietId[0]); // Send as single ID
    formDataToSend.append('attachProgramId', formData.attachProgramId[0]); // Send as single ID
    formDataToSend.append('subamount', Number(formData.subamount)); // Send as number
    if (formData.profilePic) {
        formDataToSend.append('profilePic', formData.profilePic); // Append the file directly
    }
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('subscription', formData.subscription); // Append subscription if needed

    try {
        const token = localStorage.getItem('token');
        const response = await axios.post("http://82.112.240.94:5001/api/auth/createClient", formDataToSend, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data', // Set Content-Type for FormData
            },
        });
        console.log("Client created successfully", response.data);
        if (response.data.success) {
            alert("Client created successfully");
        }
        // Reset form or redirect user after successful creation
    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        setError(error.response?.data?.message || "An error occurred while creating the client.");
    }
};

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
   <div className="create-modal">
        <div className="container shadow p-4 bg-white rounded modal-crative2">
          <div className="row">
            <div className="col-lg-12">
              <h1 className='head-profiles'> Create Client</h1>
            </div>


        <form onSubmit={handleSubmit} className="creative-from">
          <div className='row'>
            <div className="col-6 mb-3 ">

            <label htmlFor="fullname">Full Name</label>
            <input className='form-control' type="text" id="fullname" placeholder="Type" value={formData.fullname} onChange={handleInputChange} required />
            </div>
          <div className='col-6 mb-3'>
            <label htmlFor="email">Email</label>
            <input className='form-control' type="email" id="email" placeholder="Type" value={formData.email} onChange={handleInputChange} required />
          </div>
          </div>
          <div className='row'>
            <div className="col-6 mb-3">

            <label htmlFor="password">Password</label>
            <input className='form-control' type="password" id="password" value={formData.password} onChange={handleInputChange} required />
            </div>
          <div className='col-6 mb-3'>
            <label htmlFor="startingWeight">Starting Weight</label>
            <input className='form-control'  type="number" id="startingWeight" value={formData.startingWeight} onChange={handleInputChange} required />
          </div>
          </div>
          <div className='row '>
            <div className="col-6 mb-3">

            <label htmlFor="attachDietId">Attach Diet Plan</label>
            <select id="attachDietId" className='form-control' value={formData.attachDietId[0] || ''} onChange={handleInputChange} required>
              <option value="">Select Diet Plan</option>
              {dietPlans.map((diet) => (
                <option key={diet._id} value={diet._id}>{diet.dietTitle}</option>
              ))}
            </select>
              </div>
          <div className='col-6 mb-3'>
            <label htmlFor="attachProgramId" >Attach Program Plan</label>
            <select id="attachProgramId" className='form-control' value={formData.attachProgramId[0] || ''} onChange={handleInputChange} required>
              <option value="">Select Program Plan</option>
              {programPlans.map((program) => (
                <option key={program._id} value={program._id}>{program.programTitle}</option>
              ))}
            </select>
          </div>
              </div>
          <div className='row'>
            <div className="col-6 mb-3">
            <label htmlFor="subamount" >Subscription Amount</label>
            <input type="number" className='form-control' id="subamount" value={formData.subamount} onChange={handleInputChange} required />
            </div>
          <div className='col-6 mb-3'>
            <label htmlFor="upload">Profile Picture</label>
            <input type="file" id="upload" className='form-control' onChange={handleFileChange} />
          </div>
          </div>
          <div className="crative-button">
              <button type="submit" className='btn btn-primary'>Create</button>
              <button type="cancel" className='btn btn-light'>Cancel</button>
          </div>

        </form>
                </div>
        </div>
    </div>
  );
};

export default Form;