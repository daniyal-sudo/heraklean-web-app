import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { FaEllipsisV } from 'react-icons/fa';

const ScheduledCalander = () => {
  const meetings = [
    { id: 1, name: "William Jones", time: "11:00 AM", date: "07/04/2024", status: "online" },
    { id: 2, name: "Bella Jones", time: "10:00 AM", date: "07/04/2024", status: "online" },
    { id: 3, name: "Relaa Hales", time: "01:00 PM", date: "07/04/2024", status: "online" }
  ];

  // Inline styles
  const containerStyle = {
    maxWidth: '390px',
    margin: 'auto'
  };
 

  const cardStyle = {
        border: 'none',
        width: '100%',
        height: '95px',
        borderRadius: '16px',
        marginBottom: '15px',
        background: '#005CA11F'
  };

  const cardBodyStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '16px'
  };

  const avatarStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginRight: '15px'
  };

  const nameStyle = {
    fontSize: '14px',
    fontWeight: '400',
    marginBottom: '4px',
    fontFamily: 'Poppins',
    lineHeight: '20px',
    letterSpacing: '0.2189837098121643px',
    textAlign: 'left'
  };
  const nameStyles = {
    fontFamily: 'Poppins',
    fontSize: '14.31px',
    fontWeight: 600,
    lineHeight: '20.03px',
    letterSpacing: '0.2189837098121643px',
    textAlign: 'left',
  };
  const smallTextStyle = {
    fontFamily: 'Poppins',
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '18px',
    letterSpacing: '0.2189837098121643px',
    textAlign: 'left',
    color: '#000000',
  };

  const badgeStyle = (status) => ({
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: status === "online" ? 'green' : 'gray',
    marginRight: '10px'
  });

  const iconStyle = {
    cursor: 'pointer',
    color: '#6c757d',
    fontSize: '18px',
  };

  return (
    <div className="Clander-mobile" style={containerStyle}>
      <div className="d-flex justify-content-between mb-3">
        <h5 className="upcoming_border-line">Scheduled Meetings</h5>
      </div>
      <div className="d-flex mb-3 crative-buttons">
        <Button variant="btn btn-light cancel-button">View Calendar</Button>
        <Button variant="primary submit-button">Schedule New</Button>
      </div>
      
      {meetings.map(meeting => (
        <Card key={meeting.id} style={cardStyle}>
          <Card.Body style={cardBodyStyle}>
            <img
              src={`https://i.pravatar.cc/50?img=${meeting.id}`}
              alt="User Avatar"
              style={avatarStyle}
            />
            <div className="flex-grow-1">
              <h6  style={nameStyle}>Meeting with <span style={nameStyles}>{meeting.name}</span></h6>
              <small style={smallTextStyle}>{meeting.date} | {meeting.time}</small>
            </div>
            <div className="d-flex align-items-center">
              <span style={badgeStyle(meeting.status)}></span>
              <FaEllipsisV style={iconStyle} />
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};
export default ScheduledCalander;
