import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import "./calendar.css";
import { api_url } from "../../../CommonFunctions";
import { Dropdown, Button } from "react-bootstrap";
import ScheduledCalander from "./ScheduledCalander";

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
    trainingType: "",
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
    <div className="container" style={{ padding: "30px", minWidth: "100%"}}>
      <div
        className="calander-section"
        style={{ border: "1px solid #E5E5E5" }}
      >
        <div className="calander-mobile-section show-on-mobile">
           <ScheduledCalander />
        </div>
        <div className="calendar-main-container show-on-desktop">
          <div className="schedule-container d-flex justify-content-between">
            <header className="schedule-header">
              <div className="header-left">
                <h2 className="fw-bold fs-4 bg-white text-black">Schedules</h2>
                <div className="month-navigation">
                  <span>
                    {currentDate.toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <FaChevronLeft
                    onClick={() => navigateWeek(-1)}
                    style={{ cursor: "pointer" }}
                  />

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
            <div className="calendar-container scroll-clander"> 
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
                            border: "border: 1px solid #ccc",
                          }}
                          className="day-slot"
                          onClick={() => handleSlotClick(time, formattedDay)}
                        >
                          {meetingsForSlot.map((meeting) => (
                            <div
                              key={meeting._id}
                              className={`meeting  text-black`}
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
                                  <span
                                    className={`${getMeetingBackgroundColor(
                                      meeting
                                    )}`}
                                    style={{
                                      width: "10px", // Adjust size as needed
                                      height: "10px", // Adjust size as needed
                                      borderRadius: "50%", // Makes it a circle
                                      display: "inline-block", // Allows it to sit inline with text
                                      // Dynamic background color
                                    }}
                                  ></span>
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
              <div className="meeting-details  text-center">
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
                <div className="card-calander">
                  <div className="card-header">
                    <div className="card-icon">
                      <svg
                        width="35"
                        height="35"
                        viewBox="0 0 35 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.9807 31.3863C12.1102 31.5267 12.1791 31.7125 12.1724 31.9034C12.1656 32.0943 12.0838 32.2749 11.9447 32.4058L10.3809 33.8681C10.2412 33.9979 10.0558 34.0669 9.86532 34.06C9.67483 34.0531 9.49487 33.9709 9.36495 33.8314L0.257674 24.0164C0.128254 23.8759 0.0595125 23.69 0.0663883 23.4991C0.073264 23.3081 0.155201 23.1277 0.294394 22.9968L1.86039 21.5367C1.92949 21.4724 2.01059 21.4223 2.09906 21.3893C2.18752 21.3563 2.28162 21.3411 2.37596 21.3445C2.47031 21.3479 2.56306 21.3699 2.64891 21.4092C2.73477 21.4484 2.81204 21.5043 2.87631 21.5734L11.9807 31.3863ZM23.6015 12.9183C23.7309 13.0588 23.7997 13.2447 23.7928 13.4356C23.7859 13.6265 23.704 13.807 23.5648 13.9378L13.7224 23.1322C13.5828 23.2619 13.3973 23.3309 13.2068 23.3241C13.0164 23.3172 12.8364 23.235 12.7065 23.0955L10.3571 20.5604C10.2277 20.4199 10.159 20.234 10.1658 20.0431C10.1727 19.8521 10.2546 19.6717 10.3938 19.5408L20.2341 10.3464C20.3031 10.2821 20.3842 10.2321 20.4726 10.1991C20.561 10.1661 20.655 10.1509 20.7493 10.1543C20.8436 10.1578 20.9363 10.1797 21.0221 10.219C21.1078 10.2582 21.1851 10.314 21.2493 10.3832L23.6015 12.9183ZM15.3294 28.2564C15.5987 28.5466 15.5822 29.0052 15.2927 29.276L13.7267 30.7376C13.6576 30.8019 13.5765 30.852 13.4881 30.8849C13.3996 30.9179 13.3055 30.9331 13.2111 30.9297C13.1168 30.9263 13.024 30.9043 12.9382 30.8651C12.8523 30.8258 12.7751 30.77 12.7108 30.7008L3.60855 20.8858C3.47904 20.7454 3.41017 20.5595 3.41692 20.3686C3.42366 20.1777 3.50546 19.9972 3.64455 19.8663L5.20767 18.4054C5.34732 18.2757 5.53275 18.2067 5.72323 18.2135C5.91372 18.2204 6.09368 18.3026 6.22359 18.4421L15.3294 28.2564ZM30.4948 13.2704C30.6241 13.411 30.6927 13.5969 30.6857 13.7878C30.6787 13.9787 30.5966 14.1591 30.4574 14.2899L28.8921 15.7515C28.7524 15.8814 28.5669 15.9505 28.3763 15.9438C28.1857 15.937 28.0056 15.8549 27.8754 15.7155L18.7718 5.9026C18.6421 5.76227 18.5731 5.57639 18.5798 5.38543C18.5866 5.19447 18.6685 5.01391 18.8078 4.88308L20.3774 3.41788C20.4464 3.35357 20.5274 3.30351 20.6158 3.27055C20.7042 3.23759 20.7983 3.22237 20.8926 3.22579C20.9869 3.2292 21.0795 3.25116 21.1653 3.29042C21.2511 3.32968 21.3283 3.38547 21.3926 3.4546L30.4948 13.2704ZM33.8385 10.1456C33.9678 10.2863 34.0364 10.4723 34.0295 10.6632C34.0227 10.8542 33.9408 11.0348 33.8018 11.1658L32.2393 12.6267C32.1704 12.691 32.0894 12.7412 32.001 12.7742C31.9126 12.8072 31.8186 12.8225 31.7243 12.8191C31.63 12.8158 31.5373 12.7939 31.4515 12.7547C31.3657 12.7155 31.2884 12.6598 31.2242 12.5907L22.1219 2.77348C21.9925 2.63286 21.9238 2.44693 21.9305 2.25597C21.9372 2.06501 22.0189 1.88439 22.1579 1.75324L23.7218 0.289481C23.7906 0.225063 23.8716 0.174881 23.9599 0.141815C24.0482 0.108749 24.1422 0.0934499 24.2365 0.0967947C24.3307 0.100139 24.4234 0.122063 24.5092 0.161306C24.5949 0.20055 24.6721 0.256342 24.7362 0.325481L33.8385 10.1456Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                    <div className="card-title">Biceps Training</div>
                  </div>
                  <div className="card-content">
                    Lorem ipsum dolor sit amet consectetur. Elit cursus faibus
                    ipsum sed magna id magna. Turpis imperdiet.
                  </div>
                  <div className="card-time">
                    {selectedMeeting.time} AM to 10:00 AM
                  </div>
                  <button className="card-button">
                    {selectedMeeting.isRecurring
                      ? "Recurring Meeting"
                      : "One-time Meeting"}
                  </button>
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
                      className="btn btn-primary btn-radius border-0"
                      onClick={handleApproveMeeting}
                    >
                      Approve
                    </button>
                    <button
                      className=" decline-button btn-radius border-0"
                      style={{ background: "#37474F3D",
                        border:'1px solid #37474F3D'
                       }}
                       decline-button
                    >
                      Decline
                    </button>
                  </>
                 )} 
                </div>
              </div>
            )}

            {showForm && (
              <div
                className="modal fade show d-block"
                id="calendar-modal"
                tabIndex="-1"
                role="dialog"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              >
                <div className="modal-dialog modal-lg" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h3 className="modal-title">New Meeting</h3>
                      <button
                        type="button"
                        className="close"
                        aria-label="Close"
                        onClick={() => setShowForm(false)}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={handleFormSubmit}>
                        <div className="row">
                          <div className="col-6 mb-3">
                            <div className="client-dropdown">
                              <label htmlFor="clientDropdown">
                                Client Name
                              </label>
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
                                    : clients.find(
                                        (client) =>
                                          client._id === formData.client
                                      )?.fullname || "Select Client"}
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
                                          checked={
                                            formData.client === client._id
                                          }
                                          onChange={() =>
                                            setFormData({
                                              ...formData,
                                              client: client._id,
                                            })
                                          }
                                        />
                                        <div className="text-2">
                                          {client.fullname}
                                        </div>
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
                              <label htmlFor="trainingDropdown">
                                Training Type
                              </label>
                              <Dropdown
                                onSelect={(eventKey) =>
                                  setFormData({
                                    ...formData,
                                    trainingType: eventKey,
                                  })
                                }
                              >
                                <Dropdown.Toggle
                                  variant="light"
                                  className="form-control custom-dropdown-toggle d-flex justify-content-between align-items-center"
                                >
                                  {(formData.trainingType &&
                                    formData.trainingType) ||
                                    "Select Training Type"}
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
                                          checked={
                                            formData.trainingType === type
                                          }
                                          onChange={() =>
                                            setFormData({
                                              ...formData,
                                              trainingType: type,
                                            })
                                          }
                                        />
                                        <div className="text-2">{type}</div>
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
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    isRecurring: e.target.checked,
                                  })
                                }
                              />
                              Is Recurring?
                            </label>
                          </div>
                          <div
                            className="col-12"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <button
                              type="submit"
                              className="btn btn-primary mt-2"
                            >
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
