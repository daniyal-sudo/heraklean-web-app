import React, { useState } from "react";
import axiosInstance from "../../Healpers/axiosInstance";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { useEffect } from "react";
import SubscriptionList from "./SubscriptionList";
import { errorMessage, successMessage } from "../../Toast/Toast";
import { Dropdown } from "react-bootstrap";

const SubscriptionModal = ({}) => {
  const [show, setShow] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState({
    trainerId: localStorage.getItem("trainerId"),
    planName: "",
    planDuration: "",
    planAmount: "",
  });

  const [showComponent, setShowComponent] = useState("");
  const [tags, setTags] = useState([]);
  const [subscriptionId, setSubscriptionId] = useState(null);
  const [subscriptionLising, setSubscriptionListing] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  const handleChange = (newTags) => {
    setTags(newTags);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubscriptionData({ ...subscriptionData, [name]: value });
  };

  useEffect(() => {
    setShowLoader(true)
    getSubscribtion();
    
  }, [show,showComponent]);

  const getSubscribtion = async () => {
    const response = await axiosInstance.post(`/getSubscriptionsByTrainerId`, {
      trainerId: localStorage.getItem("trainerId"),
    });
    console.log(response, "responseresponseresponseresponseresponse");
    if (response?.data?.subscriptions) {
      setSubscriptionListing(response.data.subscriptions);
    } else {
      setSubscriptionListing([]);
    }
    setShowLoader(false)
  };

  const handleDelete = async (data) => {
    // try {
    //   const response = await axiosInstance.delete(`/deleteSubscription/${id}`);

    //   if (response.data.success) {
    //     // Check if deletion was successful
    //     setSubscriptionListing(subscriptions.filter((sub) => sub._id !== id));
    //     successMessage("Subscription deleted successfully.");
    //   } else {
    //     errorMessage("some thing went wrong");
    //   }
    // } catch (error) {
    //   console.error("Error deleting subscription:", error);
    // }
    setSubscriptionData({
      trainerId: localStorage.getItem("trainerId"),
      planName: data.planName,
      planDuration: data.planDuration,
      planAmount: data.planAmount,
    });
    setTags(data.planBenefits);
    setSubscriptionId(data._id);
    setShowComponent("createSub");
  };

 
  // const handleEditSubscription = ( newSubscriptionData) => {
  //   const updatedSubscriptions = subscriptionLising.map((subscription) => {
  //     if (subscription._id === newSubscriptionData._id) {
  //       // Update the subscription object if the ID matches
  //       return { ...subscriptionLising, ...newSubscriptionData };
  //     }
  //     return subscription; // Return unchanged object if ID does not match
  //   });

  //   setSubscriptionListing(updatedSubscriptions); // Update the state with the new array
  // };

  // Function to handle adding a new subscription
  const handleAddSubscription = (newSubscription) => {
    setSubscriptionListing([...subscriptionLising, newSubscription]);
  };

  const handleReset = () => {
    setSubscriptionData({
      trainerId: localStorage.getItem("trainerId"),
      planName: "",
      planDuration: "",
      planAmount: "",
    });
    setTags([]);
    setSubscriptionId("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
  
    const { planName, planDuration, planAmount, trainerId } = subscriptionData;
    const data = {
      trainerId,
      planName,
      planDuration,
      planAmount,
      planBenefits: tags,
      subscriptionId: subscriptionId ? subscriptionId : null, // Convert string to array
    };
  
    // Validation
    if (!planName || !planDuration || !planAmount || !trainerId || !tags || tags.length === 0) {
      errorMessage("All fields are required, including plan benefits (tags).");
      return; // Prevent submission if validation fails
    }
  
    try {
      // Make API call based on whether subscriptionId exists
      const endpoint = "/createSubscription";
      const method = subscriptionId ? "post" : "post"; // You could use PUT for update if needed
      
      const response = await axiosInstance[method](endpoint, data);
  
      if (response.data.success) {
        successMessage(response.data.message);
        setSubscriptionId(null);
        setShowComponent('');
        handleReset();
      } else {
        errorMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error saving subscription:", error);
      errorMessage("An error occurred while saving the subscription.");
    }
  };
  


  return (
    <>
      <div className="duration-button">
        <button
          className="btn btn-primary"
          onClick={() => {
            handleShow();
            setShowComponent("");
            setSubscriptionId(null);
            handleReset();
          }}
        >
          {subscriptionId ? "Subscription" : "Subscription"}
        </button>
      </div>

      <div
        className={`modal fade ${show ? "show" : ""}`}
        tabIndex="-1"
        style={{
          display: show ? "block" : "none",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        aria-hidden={!show}
        id="calendar-modal"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content" style={{ height: '100%', minHeight: '450px' }}>
            <div className="modal-header">
              <h5 className="modal-title">
                {showComponent === ""
                  ? "Subscription"
                  : subscriptionId
                  ? "Update Subscription"
                  : "Create Subscription"}
              </h5>

              {showComponent === "" && (
                <button
                  type="button"
                  class="close"
                  aria-label="Close"
                  onClick={handleClose}
                >
                  <span aria-hidden="true">×</span>
                </button>
              )}
            </div>
            <div className="modal-body">
              {showComponent === "" ? (
                <>
                  <div
                    style={{
                      textAlign: "right",
                      marginBottom: "3px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      
               
                    }}
                  >
                    {" "}
                    <span
                      style={{
                        backgroundColor: "rgb(83, 175, 230)",
                        color: "white",
                        borderRadius: "10px",
                        cursor:'pointer'
                      }}
                      onClick={() => {
                        setShowComponent("createSub");
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="35"
                        height="auto"
                        fill="white"
                        class="bi bi-plus"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                      </svg>
                    </span>
                  </div>
                  <SubscriptionList
                    subscriptions={subscriptionLising}
                    onDelete={handleDelete}
                    showLoader={showLoader}
                  />
                </>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="clientName" className="form-label">
                      Plan Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="planName"
                      name="planName"
                      value={subscriptionData.planName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  {/* <div className="mb-3">
                    <label htmlFor="duration" className="form-label">
                      Duration (in days)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="duration"
                      name="planDuration"
                      value={subscriptionData.planDuration}
                      onChange={handleInputChange}
                      required
                    />
                  </div> */}
                   <div className=" mb-3 dropdown-diet">
                <div className="program-dropdown">
                  {/* <label htmlFor="attachDietId">Duration</label> */}
                  <label htmlFor="clientName" className="form-label">
                  Duration
                    </label>
                  <Dropdown
                    onSelect={(eventKey) =>
                      // handleSelectChange("attachDietId", eventKey)
                      setSubscriptionData((prevData) => ({
                        ...prevData,
                        planDuration: eventKey,
                      }))
                    }
                    // Disable dropdown if no data
                  >
                    <Dropdown.Toggle
                      variant="light"
                      className="form-control custom-dropdown-toggle d-flex justify-content-between align-items-center"
              
                    >
                       {subscriptionData.planDuration || "Select Duration"}
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
                     
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="custom-dropdown-menu">
                    {["Monthly", "Quarterly", "Yearly"].map((duration, index) => (
                        <Dropdown.Item
                          key={index}
                          eventKey={duration}
                          className="custom-dropdown-item"
                        >
                          <div className="d-flex align-items-start">
                            <input
                              type="radio"
                              name="program"
                              className="me-2"
                              checked={duration === subscriptionData.planDuration}
                              onChange={() =>
                                setSubscriptionData((prevData) => ({
                                  ...prevData,
                                  planDuration: duration,
                                }))
                                
                              }
                            />
                            <div className="fw-bold">{duration}</div>
                          </div>
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                      Plan Amount
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="price"
                      name="planAmount"
                      value={subscriptionData.planAmount}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3 tags">
                    <label htmlFor="price" className="form-label">
                      Plan Benefits
                    </label>
                    {/* <input
                    type="text"
                    className="form-control"
                    id="planBenefits"
                    name="planBenefits"
                    value={subscriptionData.planBenefits}
                    onChange={handleInputChange}
                  /> */}
                    <TagsInput
                      value={tags}
                      onChange={handleChange}
                      inputProps={{
                        placeholder: "Add a tag",
                      }}
                    />
                  </div>
                </form>
              )}
            </div>
            <div className="modal-footer">
              <div className="d-flex justify-content-center duration-button">
                {showComponent !== "" && (
                  <>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={handleSubmit}
                    >
                      {subscriptionId ? "Update" : "Create "}
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setShowComponent("");
                        handleReset();
                      }}
                    >
                      {"Cancel"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionModal;
