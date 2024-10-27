import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import "./calendar.css";
import { RxCross2 } from "react-icons/rx";
import { api_url } from "../../../CommonFunctions";
import { Dropdown, Button } from "react-bootstrap";

const Calendar = () => {
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [clients, setClients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showRescheduleForm, setShowRescheduleForm] = useState(false);
  const [formData, setFormData] = useState({
    client: "",
    time: "",
    day: "",
    trainingType: " ",
    isRecurring: false,
  });
  const [currentDate, setCurrentDate] = useState(new Date());
  const [rescheduleData, setRescheduleData] = useState({
    newDay: "",
    newTime: "",
    newDate: "",
  });
  const [loading, setLoading] = useState(false);

  const handleCancelMeeting = async () => {
    if (!selectedMeeting || !selectedMeeting._id) return;

    const confirmation = window.confirm(
      "Are you sure you want to cancel this meeting?"
    );
    if (!confirmation) return;

    setLoading(true);
    try {
      const authToken = localStorage.getItem("token");
      const trainerId = localStorage.getItem("trainerId");

      const response = await axios({
        method: "post",
        url: `${api_url}cancelMeeting`,
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        data: {
          meetingId: selectedMeeting._id,
          trainerId: trainerId,
        },
      });

      if (response.data.success) {
        alert("Meeting canceled successfully");
        fetchMeetings();
        setSelectedMeeting(null);
      } else {
        alert(response.data.message || "Error canceling the meeting");
      }
    } catch (error) {
      console.error(
        "Error canceling the meeting:",
        error.response?.data || error.message
      );
      alert(
        error.response?.data?.message ||
          "An error occurred while canceling the meeting"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRescheduleClick = () => {
    if (!selectedMeeting) return;

    // Format the date properly when initializing reschedule form
    const currentDate = new Date(selectedMeeting.day);
    const formattedDate = currentDate.toISOString().split("T")[0];

    setRescheduleData({
      newDay: formattedDate,
      newTime: selectedMeeting.time,
      newDate: formattedDate,
    });
    setShowRescheduleForm(true);
  };

  const handleRescheduleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const trainerId = localStorage.getItem("trainerId");

      if (!selectedMeeting || !trainerId) {
        throw new Error("Missing required data for rescheduling");
      }

      // Format the date to match backend expectations
      const formattedDay = new Date(rescheduleData.newDay)
        .toISOString()
        .split("T")[0];

      const response = await fetch(`${api_url}rescheduleMeetingRequest`, {
        method: "Put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          meetingId: selectedMeeting._id,
          trainerId: trainerId,
          newDay: formattedDay,
          newTime: rescheduleData.newTime,
          newDate: formattedDay, // Using the same formatted date for consistency
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server response:", errorText);
        throw new Error(`Server returned ${response.status}: ${errorText}`);
      }

      const data = await response.json();

      if (data.success) {
        alert("Meeting rescheduled successfully!");
        fetchMeetings(); // Refresh meetings
        setShowRescheduleForm(false);
        setSelectedMeeting(null);
      } else {
        throw new Error(data.message || "Failed to reschedule meeting");
      }
    } catch (error) {
      console.error("Error rescheduling meeting:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const timeSlots = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
  ];

  useEffect(() => {
    fetchMeetings();
    fetchClients();
  }, [currentDate]);
  const fetchMeetings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${api_url}getTrainerMeetings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        // Log the response status and the response text (for debugging)
        const text = await response.text();
        console.error("Error response:", text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("API response:", data);

      if (data.success) {
        const allMeetings = [
          ...data.clientmeetingRequests.map((meeting) => ({
            ...meeting,
            type: "clientRequest",
          })),
          ...data.trainermeetingRequest.map((meeting) => ({
            ...meeting,
            type: "trainerRequest",
          })),
          ...data.trainerAprovemeeting.map((meeting) => ({
            ...meeting,
            type: "approved",
          })),
        ];
        setMeetings(allMeetings);
        console.log("All meetings:", allMeetings);
      }
    } catch (error) {
      console.error("Error fetching meetings:", error);
    }
  };

  const handleApproveMeeting = async () => {
    if (selectedMeeting && selectedMeeting.type === "clientRequest") {
      try {
        const token = localStorage.getItem("token");
        const trainerId = localStorage.getItem("trainerId");
        const response = await fetch(`${api_url}approveMeetingRequest`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            trainerId: trainerId,
            meetingRequestId: selectedMeeting._id,
          }),
        });
        const data = await response.json();
        if (data.success) {
          alert("Meeting approved");
          fetchMeetings(); // Refresh meetings after approval
          setSelectedMeeting(null);
        }
      } catch (error) {
        console.error("Error approving meeting:", error);
      }
    }
  };

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${api_url}getTrainerClients`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setClients(data.clients);
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const handleSlotClick = (time, day) => {
    setShowForm(true);
    setFormData({ ...formData, time, day });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const trainerId = localStorage.getItem("trainerId");

      const token = localStorage.getItem("token");
      const response = await fetch(`${api_url}createMeetingRequest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          clientId: formData.client,
          trainerId: trainerId,
          day: formData.day,
          time: formData.time,
          trainingType: formData.trainingType,
          isRecurring: formData.isRecurring,
        }),
      });
      const data = await response.json();
      if (data.success) {
        fetchMeetings(); // Refresh meetings after creating a new one
        setShowForm(false);
      }
    } catch (error) {
      console.error("Error creating meeting:", error);
    }
  };

  const getDaysInWeek = () => {
    const days = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + direction * 7);
    setCurrentDate(newDate);
  };

  const daysInWeek = getDaysInWeek();

  const getMeetingBackgroundColor = (meeting) => {
    console.log("Meeting type:", meeting.type, "Status:", meeting.status);
    switch (meeting.type) {
      case "clientRequest":
        return "bg-danger";
      case "trainerRequest":
        return "bg-primary";
      case "approved":
        return "bg-success";
      default:
        return "bg-secondary";
    }
  };
  return (
    <div className="container mt-2 w-100 mx-2">
      <div
        className="bg-white p-4 rounded"
        style={{ border: "1px solid #E5E5E5" }}
      >
        <div className="calendar-main-container">
          <div className="schedule-container d-flex justify-content-between">
            <header className="schedule-header">
              <div className="header-left">
                <h2 className="fw-bold fs-4 bg-white text-black">Schedules</h2>
                <div className="month-navigation">
                  <FaChevronLeft
                    onClick={() => navigateWeek(-1)}
                    style={{ cursor: "pointer" }}
                  />
                  <span>
                    {currentDate.toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <FaChevronRight
                    onClick={() => navigateWeek(1)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <span className="date-range">
                  {formatDate(daysInWeek[0])} - {formatDate(daysInWeek[6])}
                </span>
              </div>
              <div className="header-right">
                <button className="btn btn-white dropdown border-outline">
                  Weekly
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => setShowForm(true)}
                >
                  <AiOutlinePlus /> Add Meeting
                </button>
              </div>
            </header>
          </div>

          <div className="calendar-and-details">
            <div className="calendar-container">
              <div className="calendar-header ">
                <div className="time-slot-header d-flex justify-content-center align-items-center">
                  Time
                </div>
                {daysInWeek.map((day, index) => (
                  <div
                    key={index}
                    className="time-slot-header d-flex justify-content-center align-items-center"
                  >
                    {formatDate(day)}
                  </div>
                ))}
              </div>

              <div className="calendar-body mt-3">
                {timeSlots.map((time) => (
                  <div key={time} className="time-slot-row">
                    <div className="time-slot-label fw-light">{time}</div>
                    {daysInWeek.map((day, dayIndex) => {
                      const formattedDay = day.toISOString().split("T")[0];
                      const meetingsForSlot = meetings.filter(
                        (meeting) =>
                          meeting.day === formattedDay && meeting.time === time
                      );

                      return (
                        <div
                          key={`${dayIndex}-${time}`}
                          style={{
                            cursor: "pointer",
                            border: "1px solid rgb(209, 187, 187)",
                          }}
                          className="day-slot"
                          onClick={() => handleSlotClick(time, formattedDay)}
                        >
                          {meetingsForSlot.map((meeting) => (
                            <div
                              key={meeting._id}
                              className={`meeting ${getMeetingBackgroundColor(
                                meeting
                              )} text-white`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedMeeting(meeting);
                              }}
                            >
                              <div className="row">
                                <p className="fw-light">
                                  Meeting with:
                                  <span className="font-weight-bold">
                                    {meeting.client.fullname}
                                  </span>
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {selectedMeeting && (
              <div className="meeting-details mt-5 h-25 mx-2 text-center">
                {/* Construct the full image URL and handle fallback */}
                <img
                  src={
                    selectedMeeting.client.profilePic
                      ? `http://82.112.240.94:5001/${selectedMeeting.client.profilePic.replace(
                          /\\/g,
                          "/"
                        )}`
                      : "/profile.jpg"
                  }
                  alt="Client"
                  className="trainer-image mx-5 mb-3"
                />
                <h3>{selectedMeeting.client.fullname}</h3>
                <div className="meeting-info">
                  <p>{selectedMeeting.trainingType}</p>
                  <p>{selectedMeeting.time}</p>
                  <p>
                    {selectedMeeting.isRecurring
                      ? "Recurring Meeting"
                      : "One-time Meeting"}
                  </p>
                  <p>Status: {selectedMeeting.status}</p>
                  <p>
                    Created by:{" "}
                    {selectedMeeting.createdby ||
                      (selectedMeeting.type === "clientRequest"
                        ? "Client"
                        : "Trainer")}
                  </p>
                </div>
                <div className="meeting-actions">
                  <button
                    className="btn btn-primary btn-radius border-0"
                    onClick={handleRescheduleClick}
                  >
                    Reschedule
                  </button>
                  {selectedMeeting && (
                    <button
                      className="btn btn-danger"
                      onClick={handleCancelMeeting}
                      disabled={loading}
                    >
                      {loading ? "Canceling..." : "Cancel Meeting"}
                    </button>
                  )}

                  {selectedMeeting.type === "clientRequest" &&
                    selectedMeeting.status === "Pending" && (
                      <>
                        <button
                          className="approve-button"
                          onClick={handleApproveMeeting}
                        >
                          Approve
                        </button>
                        <button className="decline-button">Decline</button>
                      </>
                    )}
                </div>
              </div>
            )}

{showForm && (
  <div className="modal fade show d-block" id="calendar-modal" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
    <div className="modal-dialog modal-lg" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">New Meeting</h3>
          <button type="button" className="close" aria-label="Close" onClick={() => setShowForm(false)}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleFormSubmit}>
            <div className="row">
              <div className="col-6 mb-3">
                <div className="client-dropdown">
  <label htmlFor="clientDropdown">Client Name</label>
  <Dropdown
    onSelect={(eventKey) =>
      setFormData({ ...formData, client: eventKey })
    }
    disabled={clients.length === 0} // Disable dropdown if no data
  >
    <Dropdown.Toggle
      variant="light"
      className="form-control custom-dropdown-toggle d-flex justify-content-between align-items-center"
      disabled={clients.length === 0} // Disable toggle if no data
    >
      {clients.length === 0
        ? "No Clients Available"
        : clients.find((client) => client._id === formData.client)?.fullname ||
          "Select Client"}
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
      {clients.map((client) => (
        <Dropdown.Item
          key={client._id}
          eventKey={client._id}
          className="custom-dropdown-item"
        >
          <div className="d-flex align-items-start">
            <input
              type="radio"
              name="client"
              className="me-2"
              checked={formData.client === client._id}
              onChange={() => setFormData({ ...formData, client: client._id })}
            />
            <div className="fw-bold">{client.fullname}</div>
          </div>
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>
</div>

              </div>
              <div className="col-6 mb-3">
                <label>Time:</label>
                <input
                  className="form-control"
                  type="text"
                  value={formData.time}
                  readOnly
                />
              </div>
              <div className="col-6 mb-3">
                <label>Day:</label>
                <input
                  className="form-control"
                  type="text"
                  value={formData.day}
                  readOnly
                />
              </div>
              <div className="col-6 mb-3">
                <label>Date:</label>
                <input
                  className="form-control"
                  type="text"
                  value={formData.date}
                  readOnly
                />
              </div>
              <div className="col-6 mb-3">
                <div className="training-dropdown">
  <label htmlFor="trainingDropdown">Training Type</label>
  <Dropdown
    onSelect={(eventKey) =>
      setFormData({ ...formData, trainingType: eventKey })
    }
  >
    <Dropdown.Toggle
      variant="light"
      className="form-control custom-dropdown-toggle d-flex justify-content-between align-items-center"
    >
       {formData.trainingType || "Select Training Type"}
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
      {[
        "Weight Training",
        "Cardio",
        "Yoga",
        "Diet",
        "Meditation",
        "Nutrition",
        "Other",
      ].map((type) => (
        <Dropdown.Item
          key={type}
          eventKey={type}
          className="custom-dropdown-item"
        >
          <div className="d-flex align-items-start">
            <input
              type="radio"
              name="trainingType"
              className="me-2"
              checked={formData.trainingType === type}
              onChange={() =>
                setFormData({ ...formData, trainingType: type })
              }
            />
            <div className="fw-bold">{type}</div>
          </div>
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>
</div>

              </div>
              <div className="col-6 mb-3 form-check">
                <label className="form-check-label">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={formData.isRecurring}
                    onChange={(e) => setFormData({ ...formData, isRecurring: e.target.checked })}
                  />
                  Is Recurring?
                </label>
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary mt-2">
                  Book Meeting
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
)}


            {showRescheduleForm && (
              <div className="form-popup">
                <h3 className="fw-bold mb-4">Reschedule Meeting</h3>
                <form
                  onSubmit={handleRescheduleSubmit}
                  className="reschedule-form"
                >
                  <div className="form-group mb-3">
                    <label htmlFor="newDay">New Day:</label>
                    <input
                      id="newDay"
                      className="form-control"
                      type="date"
                      value={rescheduleData.newDay}
                      onChange={(e) =>
                        setRescheduleData({
                          ...rescheduleData,
                          newDay: e.target.value,
                          newDate: e.target.value, // Keep both dates in sync
                        })
                      }
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="newTime">New Time:</label>
                    <select
                      id="newTime"
                      className="form-control"
                      value={rescheduleData.newTime}
                      onChange={(e) =>
                        setRescheduleData({
                          ...rescheduleData,
                          newTime: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="">Select a new time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="button-group">
                    <button className="btn btn-primary" type="submit">
                      Confirm Reschedule
                    </button>
                    <button
                      className="btn btn-secondary ms-2"
                      type="button"
                      onClick={() => setShowRescheduleForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
