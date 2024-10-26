// ClientProfile.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaCalendarAlt, FaChevronRight } from "react-icons/fa";
import axios from "axios";
import Form from "../CreateClient/Form";

import "./ClientProfile.css";
import { api_url } from "../../../CommonFunctions";

const AppointmentCard = ({ name, date, time, imgSrc }) => {
  return (
    <div className="col-12 col-md-6 mb-4">
      <div
        className="d-flex align-items-center justify-content-between p-3 upconcoming-cards"
        style={{ border: "1px solid #E5E5E5" }}
      >
        {/* Profile Image */}
        <div className="d-flex align-items-center">
          <img
            src={imgSrc}
            alt={name}
            className="rounded"
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
          />
          {/* Text Content */}
          <div className="ms-3">
            <h6 className="mb-0 custom-font-head">{name}</h6>
            <div className="d-flex align-items-center text-muted mt-1 clander-card-content">
              <div className="icon-wrapper">
                <FaCalendarAlt
                  className="me-2"
                  size={16}
                  style={{ color: "#6CACE4" }}
                />
              </div>
              <span>{date}</span>
              <span className="mx-2">|</span>
              <span>{time}</span>
            </div>
          </div>
        </div>
        {/* Chevron Icon */}
        <FaChevronRight size={18} style={{ color: "#BDBDBD" }} />
      </div>
    </div>
  );
};
const Card = ({ name, city, imgSrc }) => {
  return (
    <div className="col-12 col-md-4 mb-4">
      {" "}
      {/* Changed to col-md-4 for 3 cards per row */}
      <div
        className="d-flex align-items-center justify-content-between p-3  min-card"
        style={{ border: "1px solid #E5E5E5" }}
      >
        {/* Profile Image */}
        <div className="d-flex align-items-center">
          <img
            src={imgSrc}
            alt={name}
            className="rounded"
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
          />
          {/* Text Content */}
          <div className="ms-3">
            <h6 className="mb-0 font-custom">{name}</h6>
            <div className="d-flex align-items-center text-muted mt-1">
              <span className="font-style-sub">{city}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClientProfile = () => {
  const [totalClients, setTotalClients] = useState(0); // State to hold total clients
  const [trainerInfo, setTrainerInfo] = useState({
    profilePic: "",
    Fname: "",
    lastName: "",
    email: "",
  });
  const [appointments, setAppointments] = useState([]);
  const [showComponent, setShowComponent] = useState("");

  const fetchTotalClients = async () => {
    try {
      // Retrieve the trainer object from local storage
      const trainerId = localStorage.getItem("trainerId");

      const token = localStorage.getItem("token");

      if (!trainerId) {
        console.error("Trainer ID not found in local storage");
        return;
      }

      // const trainerId = trainer.trainerId;

      // Make the API call with the correct trainerId
      const response = await axios.get(
        `${api_url}getTotalClients/${trainerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Total clients:", response.data.totalClients);

      // Set the total clients state from the API response
      setTotalClients(response.data.totalClients);
    } catch (error) {
      console.error("Error fetching total clients:", error);
    }
  };

  // Call the fetchTotalClients function when the component mounts
  useEffect(() => {
    fetchTotalClients();
  }, []);

  const appointmentsStaticData = [
    {
      clientName: "John Doe",
      date: "2024-10-23T09:00:00Z",
      time: "10:00 AM",
      clientProfilePic: "https://randomuser.me/api/portraits/men/1.jpg", // Example live image URL
    },
    {
      clientName: "Jane Smith",
      date: "2024-10-24T14:30:00Z",
      time: "2:30 PM",
      clientProfilePic: "https://randomuser.me/api/portraits/women/1.jpg", // Example live image URL
    },
    {
      clientName: "Mike Johnson",
      date: "2024-10-25T11:15:00Z",
      time: "11:15 AM",
      clientProfilePic: "", // Default pic will be used here
    },
    {
      clientName: "Alice Brown",
      date: "2024-10-26T16:00:00Z",
      time: "4:00 PM",
      clientProfilePic: "https://randomuser.me/api/portraits/women/2.jpg", // Example live image URL
    },
    {
      clientName: "Emma Davis",
      date: "2024-10-27T09:45:00Z",
      time: "9:45 AM",
      clientProfilePic: "https://randomuser.me/api/portraits/women/3.jpg", // Example live image URL
    },
  ];

  const fetchInfo = async () => {
    try {
      // Retrieve the trainer object from local storage
      const trainerId = localStorage.getItem("trainerId");

      const token = localStorage.getItem("token");

      if (!trainerId) {
        console.error("Trainer ID not found in local storage");
        return;
      }

      // const trainerId = trainer.trainerId;

      // Make the API call with the correct trainerId
      const response = await axios.get(
        `getinfo/${trainerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Total clients:", response.data);

      // Set the total clients state from the API response
      setTrainerInfo(response.data);
    } catch (error) {
      console.error("Error fetching total clients:", error);
    }
  };

  // Call the fetchTotalClients function when the component mounts
  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchUpcomingMeetings = async () => {
    try {
      // Retrieve the trainer ID from local storage
      const trainerId = localStorage.getItem("trainerId");
      const token = localStorage.getItem("token");

      if (!trainerId) {
        console.error("Trainer ID not found in local storage");
        return;
      }

      // Fetch the upcoming meetings
      const response = await axios.get(
        `${api_url}getUpcomingMeetings/${trainerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update state with the fetched appointments
      if (response.data.success) {
        if (!response.data.meetings) {
          setAppointments(appointmentsStaticData);
        } else {
          setAppointments(response.data.meetings);
        }
        console.log("Upcoming meetings:", response.data.meetings);
      } else {
        console.error("Failed to fetch meetings");
      }
    } catch (error) {
      console.error("Error fetching upcoming meetings:", error);
    }
  };

  useEffect(() => {
    fetchUpcomingMeetings();
  }, []);

  // const appointments = [
  //   { name: 'Kathryn Murphy', date: '06/09/24', time: '01:00 PM', imgSrc: 'pic.png' },
  //   { name: 'John Doe', date: '06/09/24', time: '02:00 PM', imgSrc: 'pic.png' },
  //   { name: 'Jane Smith', date: '07/09/24', time: '11:00 AM', imgSrc: 'pic.png' },
  //   { name: 'Michael Scott', date: '08/09/24', time: '09:00 AM', imgSrc: 'pic.png' },
  // ];

  const clients = [
    { name: "Kathryn Murphy", city: "New York, USA", imgSrc: "pic.png" },
    { name: "Kathryn Murphy", city: "New York, USA", imgSrc: "pic.png" },
    { name: "Kathryn Murphy", city: "New York, USA", imgSrc: "pic.png" },
  ];

  return (
    <>
      {showComponent === "createClient" ? (
          <Form  onClose={()=>{
			setShowComponent('')
		  }}/>
      ) : (
        <div className="container">
          <div className="row mb-2 mt-2">
            <div className="col-lg-6 mbile_screen_margin">
              <div className="row bg-white p-3 m-2 box_height small-cards">
                <div className="col-lg-7 col-6 align-self-center">
                  <h5 className="card-text font-custom-card">Good Morning,</h5>
                  <p className="card-text text-justify font-custom-large">
                    {" "}
                    {trainerInfo.Fname} {trainerInfo.lastName}
                  </p>
                </div>
                <div className="col-lg-5 col-6 align-self-center">
                  <div className="text-center">
                    <img
                      src="phy.png"
                      alt=""
                      className="img-fluid"
                      style={{ width: "98px", height: "90px" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 mbile_screen_margin">
              <div className="row bg-white p-3 m-2 box_height small-cards">
                <div className="col-lg-7 col-6 align-self-center">
                  <h5 className="card-title clinets_score font-custom-card">
                    {totalClients}
                  </h5>
                  <p className="card-text text-justify font-custom-card">
                    Clients
                  </p>
                </div>
                <div className="col-lg-5 col-6 align-self-center">
                  <div
                    className="text-end"
                    onClick={() => {
                      setShowComponent("createClient");
                    }}
                  >
                    <Link
                      // to="/create-client"
                      className="btn px-3 py-2"
                      style={{ backgroundColor: "#53AFE6", color: "#FFFFFF" }}
                    >
                      Create New
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-lg-12">
              <div className="bg-white p-4  rounded-4 client-listing">
                <h4
                  className="card-text fw-bold fs-4 mx-2 small upcoming_border-line"
                  style={{ fontWeight: "bold" }}
                >
                  Upcoming Schedules
                </h4>

                {/* Removed the <img> tag and replaced it with the styled border */}
                <div className="upcoming-card">
                  <div className="row">
                    {appointments && appointments.length > 0 ? (
                      appointments.map((appointment, index) => (
                        <AppointmentCard
                          key={index}
                          name={appointment.clientName}
                          date={new Date(appointment.date).toLocaleDateString()} // Format date as needed
                          time={appointment.time}
                          imgSrc={appointment.clientProfilePic || "anothet.png"} // Use default pic if none available
                        />
                      ))
                    ) : (
                      <div className="text-center record-image">
                        <img src="/no-event.jpg" style={{ width: "130px" }} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="bg-white p-4  rounded-4 alert-client mb-4">
                <h4
                  className="card-text upcoming_border-line"
                  style={{ fontWeight: "bold" }}
                >
                  Alerted Clients
                </h4>

                <div className="row mt-4">
                  {clients.map((Clients, index) => (
                    <Card
                      key={index}
                      name={Clients.name}
                      city={Clients.city}
                      imgSrc={Clients.imgSrc}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ClientProfile;
