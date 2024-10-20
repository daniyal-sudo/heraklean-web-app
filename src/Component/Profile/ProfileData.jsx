import React, { useState } from 'react';

const ProfileData = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    Fname: '',
    lastName: '',
    email: '',
    password: '',
    profilePic: ''
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          profilePic: reader.result, // Store base64 image data
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem('token');
      const response = await fetch('http://82.112.240.94:5001/api/auth/updateClientProfile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Profile updated successfully!');
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="container-fluid py-4 me-5 ms-4 px-5">
      <div className="bg-white p-4 px-5 rounded" style={{ border: '1px solid #E5E5E5', width: '100%' }}>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <p className='fs-4 fw-bold mt-2'>Profile</p>
            <div className="col-lg-6">
              <img src={formData.profilePic || "picture.png"} alt="Profile" className='mb-4' style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
              <div className="row">
                <div className="col">
                  <input type="file"  onChange={handleImageUpload} className="form-control mb-4 mx-2" />
                  <button type="button" className="btn btn-white mb-4 mx-2" onClick={() => setFormData({ ...formData, profilePic: '' })}>Delete</button>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <label htmlFor="Fname">Firstname</label>
              <input
                type="text"
                name="Fname"
                className="form-control mb-3"
                value={formData.Fname}
                onChange={handleChange}
              />
            </div>
            <div className="col-lg-6">
              <label htmlFor="lastName">Lastname</label>
              <input
                type="text"
                name="lastName"
                className="form-control mb-3"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                className="form-control mb-3"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="col-lg-6">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className="form-control mb-3"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <button type="submit" className='btn btn-primary'>Update</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileData;
