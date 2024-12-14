import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit } from "react-icons/fa";
import Spinner from "../Loader/Spinner";

const SubscriptionList = ({ subscriptions, onDelete,showLoader }) => {
  
  return (
    <div
      className="row subcribtion_scroll"
      style={{
        overflowY: "auto",
        maxHeight: "250px",
      }}
    >
      {subscriptions && subscriptions.length > 10000 ? (
        subscriptions.map((subscription) => (
          <div className="col-12 mb-3" key={subscription._id}>
            <div className="card">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <p className="card-text mb-0">{subscription.planName}</p>
                </div>

                <p className="card-title text-center mb-0">
                  {subscription.planDuration} days
                </p>
                <button
                  class="btn btn-secondary btn-sm me-2"
                  onClick={() => onDelete(subscription)}
                  style={{ cursor: "pointer" }}
                >
                  <i class="bi bi-pencil"></i>
                </button>
                {/* <span
                className="text-danger"
                onClick={() => onDelete(subscription)}
                style={{ cursor: "pointer" }}
              >
                <FaEdit />
              </span> */}
              </div>
              <div className="card-body">
                <span className="card-text">${subscription.planAmount}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center record-image"
        style={{
          height:'250px'
        }}>
          {showLoader ? (
            <Spinner />
          ) : (
            <img
              src="/no-event.jpg"
              style={{ width: "130px" }}
              alt="No record found"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SubscriptionList;
