import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dropdown, Button } from "react-bootstrap";
import { IoIosArrowDown } from "react-icons/io";
import UploadButton from "./UploadButton";
import CustomDropdown from "../CommonComponent/CustomDropdown";
import { api_url, getTodayDate } from "../../../CommonFunctions";
import { errorMessage, successMessage } from "../../Toast/Toast";
import axiosInstance from "../../Healpers/axiosInstance";

const Form = ({ onClose }) => {
  const [dietPlans, setDietPlans] = useState([]);
  const [programPlans, setProgramPlans] = useState([]);
  const [subscription, setSubscription] = useState([]);
  const [formData, setFormData] = useState({
    fullname: "",
    startingWeight: "",
    attachDietId: [],
    attachProgramId: [],
    subamount: "",
    profilePic: null,
    password: "",
    email: "",
    subscription_start_Date: "", // Added this field
    subscriptionId: "", // Added this field
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      const token = localStorage.getItem("token");
      try {
        const [dietResponse, programResponse] = await Promise.all([
          axios.post(
            `${api_url}getTrainerDietPlans`,
            { trainerId: localStorage.getItem("trainerId") }, // Corrected payload object
            {
              headers: { Authorization: `Bearer ${token}` }, // Corrected headers object placement
            }
          ),
        ]);

        const response = await axiosInstance.get(`/getTrainerProgramPlans`);

        setDietPlans(dietResponse.data.dietPlans);
        setProgramPlans(response.data.programPlans);
      } catch (error) {
        console.error("Error fetching plans:", error);
        setError("Failed to fetch diet and program plans. Please try again.");
      }
    };

    fetchPlans();
    getSub();
  }, []);

  const getSub = async () => {
    const response = await axiosInstance.post(`/getSubscriptionsByTrainerId`, {
      trainerId: localStorage.getItem("trainerId"),
    });

    setSubscription(response?.data?.subscriptions);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "attachDietId" || id === "attachProgramId") {
      setFormData({ ...formData, [id]: [value] });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePic: e.target.files[0] });
  };

  const handleSelectChange = (id, value) => {
    setFormData({ ...formData, [id]: [value] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    const { fullname, startingWeight, attachDietId, attachProgramId, subamount, profilePic, password, email, subscription_start_Date, subscriptionId } = formData;

    // Check if any of the required fields are empty
    if (
      !fullname ||
      !startingWeight ||
      // !subamount ||
      !profilePic ||
      !password ||
      !email ||
      // !subscription_start_Date ||
      !subscriptionId
    ) {
      return  errorMessage("All fields are required!");
    }
  
    // Check if arrays have at least one element
    if (attachDietId.length === 0 || attachProgramId.length === 0) {
      return errorMessage("Both diet and program must be attached!");
    }

    const formDataToSend = new FormData();
    formDataToSend.append("fullname", formData.fullname);
    formDataToSend.append("startingWeight", Number(formData.startingWeight));
    formDataToSend.append("attachDietId", formData.attachDietId[0]);
    formDataToSend.append("attachProgramId", formData.attachProgramId[0]);
    formDataToSend.append("subamount", Number(formData.subamount));
    if (formData.profilePic) {
      formDataToSend.append("profilePic", formData.profilePic);
    }
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("subscription_start_Date", getTodayDate());
    formDataToSend.append("subscriptionId", formData.subscriptionId[0]);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${api_url}createClient`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Client created successfully", response.data);
      if (response.data.success) {
        successMessage("Client created successfully");
        onClose();
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      errorMessage(
        error.response?.data?.message ||
          "An error occurred while creating the client."
      );
    }
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  console.log(formData, "formDataformData");

  function getPlanDetailsById(plans, id) {
    const plan = plans.find((plan) => plan._id === id);
    if (!plan) {
      return "Plan not found";
    }
    return `${plan.planName} $${plan.planAmount} ${plan.planDuration}`;
  }

  return (
    <div className="create-modal">
      <div className="container p-4 bg-white modal-crative2">
        <div className="row">
          <div className="col-lg-12">
            <h1 className="create-profiles"> Create Client</h1>
          </div>

          <form onSubmit={handleSubmit} className="creative-from">
            <div className="row">
              <div className="col-6 mb-3 ">
                <label htmlFor="fullname">Full Name</label>
                <input
                  className="form-control"
                  type="text"
                  id="fullname"
                  placeholder="Full name"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  // required
                />
              </div>
              <div className="col-6 mb-3">
                <label htmlFor="email">Email</label>
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  // required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-6 mb-3">
                <label htmlFor="password">Password</label>
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  // required
                />
              </div>
              <div className="col-6 mb-3">
                <label htmlFor="startingWeight">Starting Weight</label>
                <input
                  className="form-control"
                  type="number"
                  id="startingWeight"
                  value={formData.startingWeight}
                  onChange={handleInputChange}
                  // required
                  placeholder="Starting weight"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-6 mb-3 dropdown-diet">
                <div className="program-dropdown">
                  <label htmlFor="attachDietId">Attach Diet Plan</label>
                  <Dropdown
                    onSelect={(eventKey) =>
                      handleSelectChange("attachDietId", eventKey)
                    }
                    disabled={dietPlans.length === 0} // Disable dropdown if no data
                  >
                    <Dropdown.Toggle
                      variant="light"
                      className="form-control custom-dropdown-toggle d-flex justify-content-between align-items-center"
                      disabled={dietPlans.length === 0} // Disable toggle if no data
                    >
                      <span className="dropdown-icon-wrapper">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-chevron-down"
                          width="18"
                          height="18"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </span>
                      {dietPlans.length === 0
                        ? "No Diet Plans Available"
                        : dietPlans.find(
                            (diet) => diet._id === formData.attachDietId[0]
                          )?.dietTitle || "Select Diet Plan"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="custom-dropdown-menu">
                      {dietPlans.map((diet) => (
                        <Dropdown.Item
                          key={diet._id}
                          eventKey={diet._id}
                          className="custom-dropdown-item"
                        >
                          <div className="d-flex align-items-start">
                            <input
                              type="radio"
                              name="program"
                              className="me-2"
                              checked={formData.attachDietId === diet._id}
                              onChange={() =>
                                handleSelectChange("attachDietId", diet._id)
                              }
                            />
                            <div className="fw-bold">{diet.dietTitle}</div>
                          </div>
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>

              <div className="col-6 mb-3 dropdown-diet">
                <div className="program-dropdown">
                  <label htmlFor="attachDietId">Attach Program Plan</label>
                  <Dropdown
                    onSelect={(eventKey) =>
                      handleSelectChange("attachProgramId", eventKey)
                    }
                    disabled={programPlans.length === 0} // Disable dropdown if no data
                  >
                    <Dropdown.Toggle
                      variant="light"
                      className="form-control custom-dropdown-toggle d-flex justify-content-between align-items-center"
                      disabled={programPlans.length === 0} // Disable toggle if no data
                    >
                      <span className="dropdown-icon-wrapper">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-chevron-down"
                          width="18"
                          height="18"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </span>
                      {programPlans.find(
                        (plan) => plan._id === formData.attachProgramId[0]
                      )
                        ? programPlans.find(
                            (plan) => plan._id === formData.attachProgramId[0]
                          ).title
                        : "Select Program Plan"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="custom-dropdown-menu">
                      {programPlans.map((diet) => (
                        <Dropdown.Item
                          key={diet._id}
                          eventKey={diet._id}
                          className="custom-dropdown-item"
                        >
                          <div className="d-flex align-items-start">
                            <input
                              type="radio"
                              name="program"
                              className="me-2"
                              checked={formData.attachProgramId === diet._id}
                              onChange={() =>
                                handleSelectChange("attachDietId", diet._id)
                              }
                            />
                            <div className="fw-bold">{diet.title}</div>
                          </div>
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              {/* <div className='col-6 mb-3 dropdown-diet'>
            <CustomDropdown programs={programs} />
            </div> */}
            </div>

            <div className="row">
              <div className="col-6 mb-3 dropdown-diet">
                <div className="program-dropdown">
                  <label htmlFor="attachDietId">Subscription</label>
                  <Dropdown
                    onSelect={(eventKey) =>
                      handleSelectChange("subscriptionId", eventKey)
                    }
                    disabled={subscription.length === 0} // Disable dropdown if no data
                  >
                    <Dropdown.Toggle
                      variant="light"
                      className="form-control custom-dropdown-toggle d-flex justify-content-between align-items-center"
                      disabled={subscription.length === 0} // Disable toggle if no data
                    >
                      <span className="dropdown-icon-wrapper">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-chevron-down"
                          width="18"
                          height="18"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </span>
                      {subscription.find(
                        (plan) => plan._id === formData.subscriptionId[0]
                      )
                        ? getPlanDetailsById(
                            subscription,
                            formData.subscriptionId[0]
                          )
                        : "Select subcribtion Plan"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="custom-dropdown-menu">
                      {subscription.map((diet) => (
                        <Dropdown.Item
                          key={diet._id}
                          eventKey={diet._id}
                          className="custom-dropdown-item"
                        >
                          <div className="d-flex align-items-start">
                            <input
                              type="radio"
                              name="program"
                              className="me-2"
                              checked={formData.subscriptionId === diet._id}
                              onChange={() =>
                                handleSelectChange("subscriptionId", diet._id)
                              }
                            />
                            <div className="fw-bold">
                              {getPlanDetailsById(subscription, diet._id)}
                            </div>
                          </div>
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              {/* <div className="col-6 mb-3">
                <label htmlFor="subamount">Subscription Amount</label>
                <input
                  type="number"
                  className="form-control"
                  id="subamount"
                  value={formData.subamount}
                  onChange={handleInputChange}
                  required
                />
              </div> */}
              <div className="col-6 mb-3">
                <UploadButton handleFileChange={handleFileChange} />
              </div>
            </div>

            <div className="crative-button">
              <button type="submit" className="btn btn-primary">
                Create
              </button>
              <button className="btn btn-light" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Form;
