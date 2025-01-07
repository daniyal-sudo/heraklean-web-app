import React, { useState, useEffect } from "react";
import "../Profile/Profile.css";
import { api_url } from "../../../CommonFunctions";
import { errorMessage, successMessage } from "../../Toast/Toast";
import Spinner from "../Loader/Spinner";

const ProfileData = () => {
  const [showLoader, setShowLoader] = useState(false);
  // State to hold form data
  const [formData, setFormData] = useState({
    Fname: "",
    lastName: "",
    email: "",
    password: "",
    profilePic: "",
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
      const token = localStorage.getItem("token");
      const response = await fetch(`${api_url}updateClientProfile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        successMessage(data.message);
      } else {
        errorMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      errorMessage("Please choose small size image");
    }
  };
  useEffect(() => {
    setShowLoader(true);
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const trainerId = localStorage.getItem("trainerId");
        const response = await fetch(`${api_url}getinfo/${trainerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.success && data.profilePic) {
          const fixedProfilePic = data.profilePic.replace(/\\/g, "/");
          const imageUrl = `http://82.112.240.94:5001/${fixedProfilePic}`;
        }
        // alert('')
        // console.log('response.data',data)
        setFormData(data);
        setShowLoader(false);
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div
      className="container-fluid m-0 profile-screen"
      style={{ height: "100%" }}
    >
      <div
        className="profile-page"
        style={{ border: "1px solid #E5E5E5", width: "100%" }}
      >
        {showLoader ? (
          <div className="text-center record-image "
          style={{height:'750px'}}>
          <Spinner />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="col-8 profile-section">
            <div className="row">
              <p className="fs-4 mt-2 head-profile">Profile</p>
              <div className="col-lg-6">
                <img
                  src={
                    formData.profilePic ||
                    "https://cdn-icons-png.flaticon.com/512/833/833281.png"
                  }
                  alt="Profile"
                  className="mb-4"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <div className="row">
                  <div className="col profile-buttons">
                    <div className="profile_chosse">
                      <div class="custom-file-upload">
                        <label for="fileUpload" class="btn btn-primary">
                          Upload picture
                        </label>
                        <input
                          id="fileUpload"
                          type="file"
                          onChange={handleImageUpload}
                          className="form-control-file"
                        />
                      </div>
                      <button
                        type="button"
                        className="btn btn-white d-none"
                        onClick={() =>
                          setFormData({ ...formData, profilePic: "" })
                        }
                      >
                        {" "}
                        <i
                          className="bi bi-trash-fill"
                          style={{ fontSize: "1rem" }}
                        ></i>
                        Delete
                      </button>
                    </div>
                    <div className="para-profile">
                      <p>Add a picture, recommended size: 256x256</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="from-profile">
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
                <div className="col-lg-6 para-profile">
                  <p>
                    After updating, you will receive a confirmation email on
                    your current address.
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfileData;
