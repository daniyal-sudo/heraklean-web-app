import React, { useState, useEffect } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import SingleClient from "./SingleClient";
import axios from "axios";
import { api_url } from "../../../CommonFunctions";
import Form from "../CreateClient/Form";
const Card = ({ name, city, imgSrc, clientId, setClinetId,setShowComponent }) => {
  // Assuming your backend serves images from a folder like 'http://localhost:5001/uploads/'
  const imageUrl = imgSrc
    ? `http://82.112.240.94:5001/${imgSrc.replace(/\\/g, "/")}`
    : "default_image.png";

  return (
    <div className="col-12 mb-4">
      <div
        className="d-flex align-items-center justify-content-between p-3 upconcoming-cards"
        style={{ border: "1px solid #E5E5E5" }}
      >
        {/* Image Section */}
        <div className="col-auto">
          <img
            src="pic.png"
            alt={name}
            className="rounded"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "";
              e.target.alt = "Profile";
            }}
          />
        </div>

        {/* Name and City Section */}
        <div className="col">
          <h6 className="mb-0">
            {name.length > 8 ? name.slice(0, 8) + "..." : name}
          </h6>
          <div className="d-flex align-items-center text-muted mt-1 para">
            <span>{city}</span>
          </div>
        </div>

        {/* Notification Badge Section */}
        <div className="col-auto">
          <div className="notification_badge_icon_padding">
            <div className="icon_wrap">
              <i className="bi bi-bell text-2xl"></i>
              <span
                className="notification_badge"
                style={{
                  position: "absolute",
                  background: "rgb(83, 175, 230)",
                  position: "absolute",
                  top: "-4px",
                  right: "-6px",
                  width: "16px",
                  height: "16px",
                  borderRadius: "10px",
                }}
              ></span>
            </div>
          </div>
        </div>

        {/* Link Section */}
        <div
          className="col-auto"
          onClick={() => {
            setClinetId(clientId);
            setShowComponent("clientDetail");
          }}
        >
          <Link
          //  to={`/SingleClient/${clientId}`}
          >
            <FaChevronRight size={18} style={{ color: "#BDBDBD" }} />
          </Link>
        </div>
      </div>
    </div>
  );
};

const AllClients = () => {
  const [clients, setClients] = useState([]);
  const [clinetId, setClinetId] = useState(null);

  const [showComponent, setShowComponent] = useState("");

  const [searchTerm, setSearchTerm] = useState(''); 
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${api_url}getTrainerClients`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          setClients(response.data.clients);
          console.log(response.data.clients);
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  // const clients = [
  //   { name: 'Kathryn Murphy', city:"New York, USA", imgSrc: 'pic.png' },
  //   { name: 'Kathryn Murphy', city:"New York, USA", imgSrc: 'pic.png' },
  //   { name: 'Kathryn Murphy', city:"New York, USA", imgSrc: 'pic.png' },
  //   { name: 'Kathryn Murphy', city:"New York, USA", imgSrc: 'pic.png' },
  //   { name: 'Kathryn Murphy', city:"New York, USA", imgSrc: 'pic.png' },
  //   { name: 'Kathryn Murphy', city:"New York, USA", imgSrc: 'pic.png' },
  //   { name: 'Kathryn Murphy', city:"New York, USA", imgSrc: 'pic.png' },
  //   { name: 'Kathryn Murphy', city:"New York, USA", imgSrc: 'pic.png' },
  //   { name: 'Kathryn Murphy', city:"New York, USA", imgSrc: 'pic.png' },
  // ];

  console.log(clinetId, showComponent,'222222222222')

  const filteredClients = clients.filter(
    (clients) =>
      clients.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      {showComponent === "createClient" ? (
        <Form
          onClose={() => {
            setShowComponent("");
          }}
        />
      ) : clinetId !== null && showComponent === "clientDetail" ? (
        <SingleClient
          onClose={() => {
            setShowComponent("");
          }}
          clinetId={clinetId}
        />
      ) : (
        <div
          className="container client-section m-0"
          style={{ maxWidth: "100%", padding: "30px" }}
        >
          <div className="client-pages-mini">
            <div className="row">
              <div className="col-lg-3">
                <h4
                  className="mb-4 small fs-5 upcoming_border-line"
                  style={{ fontWeight: "bold" }}
                >
                  All Clients
                </h4>
              </div>
              <div className="col-lg-3">
                <div className="text-start mb-4">
                  <Link
                    onClick={() => {
                      setShowComponent("createClient");
                    }}
                    // to="/create-client"
                    className="btn px-3 py-2"
                    style={{ backgroundColor: "#53AFE6", color: "#FFFFFF" }}
                  >
                    Create New
                  </Link>
                </div>
              </div>
              <div className="greeting col-lg-6">
                <div className="search-bar-container mb-4">
                  <div className="input-group position-relative">
                    <div className="search-line"></div>{" "}
                    {/* New element for the line */}
                    <input
                      type="text"
                      className="form-control form-control-sm search_padding searchbar"
                      placeholder="Search Here"
                      aria-label="Search"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="client-mini-cards">
              <div className="row">
                {filteredClients && filteredClients.length > 0 ? (
                  filteredClients.map((client) => (
                    <div className="col-lg-6 p-0 font-poppins">
                      <Card
                        key={client._id}
                        name={client.fullname}
                        city={client.city || "Unknown"} // Assuming city is not available in API response
                        imgSrc={client.profilePic || "pic.png"}
                        clientId={client._id}
                        setClinetId={setClinetId}
						setShowComponent={setShowComponent}
                      />
                    </div>
                  ))
                ) : (
                  <div className="text-center record-image no-record-found-h">
                    <img src="/no-event.jpg" style={{ width: "130px" }} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllClients;
