import React, { useState } from 'react';
import axiosInstance from '../../Healpers/axiosInstance';

const SubscriptionModal = ({subscriptionId ='672cfb3800e618c910816b5a'}) => {
  const [show, setShow] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState({
    trainerId: localStorage.getItem("trainerId"),
    planName: "Gold Plan",
    planDuration: 30,
    planAmount: 100,
    planBenefits: ["Unlimited access", "Priority support", "Monthly analytics"]
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubscriptionData({ ...subscriptionData, [name]: value });
  };

  const handleSubmit = async (e) => {
    const { planName, planDuration, planAmount, planBenefits } = subscriptionData;
    const data = {
      trainerId: subscriptionData.trainerId,
      planName,
      planDuration,
      planAmount,
      planBenefits:["Unlimited access", "Priority support", "Monthly analytics"],
      subscriptionId: subscriptionId ? subscriptionId :null  // Convert string to array
    };

    try {
      if (subscriptionId) {
        const response = await axiosInstance.delete(`/deleteSubscription/${subscriptionId}`);
      }else{
      if (subscriptionId) {
        await axiosInstance.post(`/deleteSubscription`, data);
      } else {
        await axiosInstance.post('/createSubscription', data);
      }
    }
     // Callback to refresh parent component data
      handleClose();
    } catch (error) {
      console.error("Error saving subscription:", error);
    }
  };


  return (
    <>
      <div className="duration-button">
        <button className="btn btn-primary" onClick={handleShow}>
        {subscriptionId ? 'Subscription' : 'Subscription'}
        </button>
      </div>

      {/* Bootstrap 5 Modal Structure */}
      <div className={`modal fade ${show ? 'show' : ''}`} tabIndex="-1" style={{ display: show ? 'block' : 'none', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} aria-hidden={!show} id="calendar-modal">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Subscription</h5>
              <button type="button" class="close" aria-label="Close" onClick={handleClose}><span aria-hidden="true">×</span></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="clientName" className="form-label">Plan Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="planName"
                    value={subscriptionData.planName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="duration" className="form-label">Duration</label>
                  <input
                    type="text"
                    className="form-control"
                    id="duration"
                    name="planDuration"
                    value={subscriptionData.planDuration}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">Plan Amount</label>
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
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">Plan Benefits</label>
                  <input
                    type="text"
                    className="form-control"
                    id="planBenefits"
                    name="planBenefits"
                    value={subscriptionData.planBenefits}
                    onChange={handleInputChange}
                  />
                </div>
               
              </form>
            </div>
            <div className="modal-footer">
            <div className="d-flex justify-content-center duration-button">
                  <button type="submit" className="btn btn-primary" 
                  onClick={handleSubmit}>{subscriptionId ? 'Update' : 'Create '}</button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionModal;
