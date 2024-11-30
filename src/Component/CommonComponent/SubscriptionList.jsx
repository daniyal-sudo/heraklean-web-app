import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit } from "react-icons/fa";

const SubscriptionList = ({ subscriptions, onDelete }) => {
  return (
    <div className="row subcribtion_scroll" style={{
      overflowY:'auto',
      maxHeight:'250px'
    }}>
      {subscriptions.map((subscription) => (
        <div className="col-12 mb-3" key={subscription._id}>
          <div className="card">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <p className="card-text mb-0">{subscription.planName}</p>
              </div>

              <p className="card-title text-center mb-0">
                {subscription.planDuration} days
              </p>

              <span
                className="text-danger"
                onClick={() => onDelete(subscription)}
                style={{ cursor: "pointer" }}
              >
                <FaEdit />
              </span>
            </div>
            <div className="card-body">
              <span className="card-text">${subscription.planAmount}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubscriptionList;
