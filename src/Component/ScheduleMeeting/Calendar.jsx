import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { AiOutlinePlus } from 'react-icons/ai';
import axios from 'axios';
import './calendar.css';

const Calendar = () => {
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [clients, setClients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showRescheduleForm, setShowRescheduleForm] = useState(false);
  const [formData, setFormData] = useState({
    client: '',
    time: '',
    day: '',
    trainingType: ' ',
    isRecurring: false,
  });
  const [currentDate, setCurrentDate] = useState(new Date());
  const [rescheduleData, setRescheduleData] = useState({
    newDay: '',
    newTime: '',
    newDate: ''
  });
  const [loading, setLoading] = useState(false);

  const handleCancelMeeting = async () => {
    if (!selectedMeeting || !selectedMeeting._id) return;

    const confirmation = window.confirm("Are you sure you want to cancel this meeting?");
    if (!confirmation) return;

    setLoading(true);
    try {
      const authToken = localStorage.getItem('token');
      const trainerId = localStorage.getItem('trainerId');

      const response = await axios({
        method: 'post',
        url: `http://82.112.240.94:5001/api/auth/cancelMeeting`,
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        data: {
          meetingId: selectedMeeting._id,
          trainerId: trainerId
        }
      });

      if (response.data.success) {
        alert('Meeting canceled successfully');
        fetchMeetings();
        setSelectedMeeting(null);
      } else {
        alert(response.data.message || 'Error canceling the meeting');
      }
    } catch (error) {
      console.error('Error canceling the meeting:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'An error occurred while canceling the meeting');
    } finally {
      setLoading(false);
    }
  };





  const handleRescheduleClick = () => {
    if (!selectedMeeting) return;

    // Format the date properly when initializing reschedule form
    const currentDate = new Date(selectedMeeting.day);
    const formattedDate = currentDate.toISOString().split('T')[0];

    setRescheduleData({
      newDay: formattedDate,
      newTime: selectedMeeting.time,
      newDate: formattedDate
    });
    setShowRescheduleForm(true);
  };

  const handleRescheduleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const trainerId = localStorage.getItem('trainerId');

      if (!selectedMeeting || !trainerId) {
        throw new Error('Missing required data for rescheduling');
      }

      // Format the date to match backend expectations
      const formattedDay = new Date(rescheduleData.newDay).toISOString().split('T')[0];

      const response = await fetch('http://82.112.240.94:5001/api/auth/rescheduleMeetingRequest', {
        method: 'Put',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          meetingId: selectedMeeting._id,
          trainerId: trainerId,
          newDay: formattedDay,
          newTime: rescheduleData.newTime,
          newDate: formattedDay // Using the same formatted date for consistency
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server response:', errorText);
        throw new Error(`Server returned ${response.status}: ${errorText}`);
      }

      const data = await response.json();

      if (data.success) {
        alert('Meeting rescheduled successfully!');
        fetchMeetings(); // Refresh meetings
        setShowRescheduleForm(false);
        setSelectedMeeting(null);
      } else {
        throw new Error(data.message || 'Failed to reschedule meeting');
      }
    } catch (error) {
      console.error('Error rescheduling meeting:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM',
  ];

  useEffect(() => {
    fetchMeetings();
    fetchClients();
  }, [currentDate]);
  const fetchMeetings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://82.112.240.94:5001/api/auth/getTrainerMeetings', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      if (!response.ok) {
        // Log the response status and the response text (for debugging)
        const text = await response.text();
        console.error('Error response:', text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('API response:', data);

      if (data.success) {
        const allMeetings = [
          ...data.clientmeetingRequests.map(meeting => ({ ...meeting, type: 'clientRequest' })),
          ...data.trainermeetingRequest.map(meeting => ({ ...meeting, type: 'trainerRequest' })),
          ...data.trainerAprovemeeting.map(meeting => ({ ...meeting, type: 'approved' }))
        ];
        setMeetings(allMeetings);
        console.log('All meetings:', allMeetings);
      }
    } catch (error) {
      console.error('Error fetching meetings:', error);
    }
  };

  const handleApproveMeeting = async () => {
    if (selectedMeeting && selectedMeeting.type === 'clientRequest') {
      try {
        const token = localStorage.getItem('token');
        const trainerId = localStorage.getItem('trainerId');
        const response = await fetch('http://82.112.240.94:5001/api/auth/approveMeetingRequest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            trainerId: trainerId,
            meetingRequestId: selectedMeeting._id
          }),
        });
        const data = await response.json();
        if (data.success) {
          alert('Meeting approved');
          fetchMeetings(); // Refresh meetings after approval
          setSelectedMeeting(null);
        }
      } catch (error) {
        console.error('Error approving meeting:', error);
      }
    }
  };

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://82.112.240.94:5001/api/auth/getTrainerClients', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      const data = await response.json();
      if (data.success) {
        setClients(data.clients);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const handleSlotClick = (time, day) => {
    setShowForm(true);
    setFormData({ ...formData, time, day });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const trainerId = localStorage.getItem('trainerId');

      const token = localStorage.getItem('token');
      const response = await fetch('http://82.112.240.94:5001/api/auth/createMeetingRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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
      console.error('Error creating meeting:', error);
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
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', });
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + direction * 7);
    setCurrentDate(newDate);
  };

  const daysInWeek = getDaysInWeek();

  const getMeetingBackgroundColor = (meeting) => {
    console.log('Meeting type:', meeting.type, 'Status:', meeting.status);
    switch (meeting.type) {
      case 'clientRequest':
        return 'bg-danger';
      case 'trainerRequest':
        return 'bg-primary';
      case 'approved':
        return 'bg-success';
      default:
        return 'bg-secondary';
    }
  };
  return (
    <div className="container mt-2 w-100 mx-2">
      <div className="bg-white p-4 rounded" style={{ border: '1px solid #E5E5E5' }}>
        <div className="calendar-main-container">
          <div className="schedule-container d-flex justify-content-between">
            <header className="schedule-header">
              <div className="header-left">
                <h2 className='fw-bold fs-4 bg-white text-black'>Schedules</h2>
                <div className="month-navigation">
                  <FaChevronLeft onClick={() => navigateWeek(-1)} style={{ cursor: 'pointer' }} />
                  <span>{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  <FaChevronRight onClick={() => navigateWeek(1)} style={{ cursor: 'pointer' }} />
                </div>
                <span className="date-range">
                  {formatDate(daysInWeek[0])} - {formatDate(daysInWeek[6])}
                </span>
              </div>
              <div className="header-right">
                <button className="btn btn-white dropdown border-outline">Weekly</button>
                <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                  <AiOutlinePlus /> Add Meeting
                </button>
              </div>
            </header>
          </div>

          <div className="calendar-and-details">
            <div className="calendar-container">
              <div className="calendar-header ">
                <div className="time-slot-header d-flex justify-content-center align-items-center">Time</div>
                {daysInWeek.map((day, index) => (
                  <div key={index} className="time-slot-header d-flex justify-content-center align-items-center">
                    {formatDate(day)}
                  </div>
                ))}
              </div>

              <div className="calendar-body mt-3">
                {timeSlots.map((time) => (
                  <div key={time} className="time-slot-row">
                    <div className="time-slot-label fw-light">{time}</div>
                    {daysInWeek.map((day, dayIndex) => {
                      const formattedDay = day.toISOString().split('T')[0];
                      const meetingsForSlot = meetings.filter(
                        meeting => meeting.day === formattedDay && meeting.time === time
                      );

                      return (
                        <div
                          key={`${dayIndex}-${time}`}
                          style={{ cursor: 'pointer', border: '1px solid rgb(209, 187, 187)' }}
                          className="day-slot"
                          onClick={() => handleSlotClick(time, formattedDay)}
                        >
                          {meetingsForSlot.map((meeting) => (
                            <div
                              key={meeting._id}
                              className={`meeting ${getMeetingBackgroundColor(meeting)} text-white`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedMeeting(meeting);
                              }}
                            >
                              <div className="row">

                                <p className='fw-light'>Meeting with:<span className='font-weight-bold'>

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
      src={selectedMeeting.client.profilePic ? `http://82.112.240.94:5001/${selectedMeeting.client.profilePic.replace(/\\/g, '/')}` : '/profile.jpg'} 
      alt="Client" 
      className="trainer-image mx-5 mb-3" 
    />
    <h3>{selectedMeeting.client.fullname}</h3>
    <div className="meeting-info">
      <p>{selectedMeeting.trainingType}</p>
      <p>{selectedMeeting.time}</p>
      <p>{selectedMeeting.isRecurring ? 'Recurring Meeting' : 'One-time Meeting'}</p>
      <p>Status: {selectedMeeting.status}</p>
      <p>Created by: {selectedMeeting.createdby || (selectedMeeting.type === 'clientRequest' ? 'Client' : 'Trainer')}</p>
    </div>
    <div className="meeting-actions">
      <button className="btn btn-primary btn-radius border-0" onClick={handleRescheduleClick}>Reschedule</button>
      {selectedMeeting && (
        <button
          className="btn btn-danger"
          onClick={handleCancelMeeting}
          disabled={loading}
        >
          {loading ? 'Canceling...' : 'Cancel Meeting'}
        </button>
      )}

      {selectedMeeting.type === 'clientRequest' && selectedMeeting.status === 'Pending' && (
        <>
          <button className="approve-button" onClick={handleApproveMeeting}>
            Approve
          </button>
          <button className="decline-button">Decline</button>
        </>
      )}
    </div>
  </div>
)}

            {showForm && (
              <div className="form-popup">
                <form onSubmit={handleFormSubmit}>
                  <h3>Book a Slot</h3>
                  <label>
                    Client Name:
                    <select
                      className='form-control'
                      value={formData.client}
                      onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                      required
                    >
                      <option value="">Select Client</option>
                      {clients.map((client) => (
                        <option key={client._id} value={client._id}>{client.fullname}</option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Time:
                    <input className='form-control' type="text" value={formData.time} readOnly />
                  </label>

                  <label>
                    Day:
                    <input className='form-control' type="text" value={formData.day} readOnly />
                  </label>
                  <label>
                    Date:
                    <input className='form-control' type="text" value={formData.date} readOnly />
                  </label>

                  <label>
                    Training Type:
                    <select
                      className='form-control'
                      value={formData.trainingType}
                      onChange={(e) => setFormData({ ...formData, trainingType: e.target.value })}
                    >
                      <option value="Weight Training">Weight Training</option>
                      <option value="Cardio">Cardio</option>
                      <option value="Yoga">Yoga</option>
                      <option value="Diet">Diet</option>
                      <option value="Meditation">Meditation</option>
                      <option value="Nutrition">Nutrition</option>
                      <option value="Other">Other</option>
                    </select>
                  </label>

                  <label>
                    Is Recurring?
                    <input
                      type="checkbox"
                      checked={formData.isRecurring}
                      onChange={(e) => setFormData({ ...formData, isRecurring: e.target.checked })}
                    />
                  </label>

                  <button type="submit" className="btn btn-primary mt-2">Book Meeting</button>
                </form>
              </div>
            )}

            {showRescheduleForm && (
              <div className="form-popup">
                <h3 className="fw-bold mb-4">Reschedule Meeting</h3>
                <form onSubmit={handleRescheduleSubmit} className="reschedule-form">
                  <div className="form-group mb-3">
                    <label htmlFor="newDay">New Day:</label>
                    <input
                      id="newDay"
                      className="form-control"
                      type="date"
                      value={rescheduleData.newDay}
                      onChange={(e) => setRescheduleData({
                        ...rescheduleData,
                        newDay: e.target.value,
                        newDate: e.target.value // Keep both dates in sync
                      })}
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="newTime">New Time:</label>
                    <select
                      id="newTime"
                      className="form-control"
                      value={rescheduleData.newTime}
                      onChange={(e) => setRescheduleData({
                        ...rescheduleData,
                        newTime: e.target.value
                      })}
                      required
                    >
                      <option value="">Select a new time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>{time}</option>
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