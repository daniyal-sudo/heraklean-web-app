import React, { useState } from "react";
import axiosInstance from "../../Healpers/axiosInstance";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { useEffect } from "react";
import SubscriptionList from "./SubscriptionList";
import { errorMessage, successMessage } from "../../Toast/Toast";

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
    const { planName, planDuration, planAmount } = subscriptionData;
    const data = {
      trainerId: subscriptionData.trainerId,
      planName,
      planDuration,
      planAmount,
      planBenefits: tags,
      subscriptionId: subscriptionId ? subscriptionId : null, // Convert string to array
    };

    try {
      if (subscriptionId) {
        const response = await axiosInstance.post(`/createSubscription`, data);
        if (response.data.success) {
          successMessage(response.data.message);
          // handleAddSubscription(response.data.subscription)
          setSubscriptionId(null);
         setShowComponent('')
          handleReset();
        } else {
          errorMessage(response.data.message);
        }
      } else {
        const response = await axiosInstance.post("/createSubscription", data);
        if (response.data.success) {
          successMessage(response.data.message);
          // handleEditSubscription(response.data.subscription)
          setSubscriptionId(null);
         setShowComponent('')
          handleReset();
        } else {
          errorMessage(response.data.message);
        }
      }

      // Callback to refresh parent component data
    } catch (error) {
      console.error("Error saving subscription:", error);
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
          <div className="modal-content">
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
                    }}
                  >
                    {" "}
                    <span
                      style={{
                        backgroundColor: "rgb(83, 175, 230)",
                        color: "white",
                      }}
                      onClick={() => {
                        setShowComponent("createSub");
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
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
                  <div className="mb-3">
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
