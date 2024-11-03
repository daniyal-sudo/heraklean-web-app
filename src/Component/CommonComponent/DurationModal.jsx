import React, { useState } from 'react';

const DurationModal = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the submission logic here
    console.log({ name, duration, price });
    handleClose(); // Close the modal after submission
  };

  return (
    <>
      <div className="duration-button">
        <button className="btn btn-primary" onClick={handleShow}>
          Duration
        </button>
      </div>

      {/* Bootstrap 5 Modal Structure */}
      <div className={`modal fade ${show ? 'show' : ''}`} tabIndex="-1" style={{ display: show ? 'block' : 'none' }} aria-hidden={!show} id="calendar-modal">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">New Meeting</h5>
              <button type="button" class="close" aria-label="Close" onClick={handleClose}><span aria-hidden="true">×</span></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="clientName" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="clientName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="duration" className="form-label">Duration</label>
                  <input
                    type="text"
                    className="form-control"
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">Price</label>
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
               
              </form>
            </div>
            <div className="modal-footer">
            <div className="d-flex justify-content-center duration-button">
                  <button type="submit" className="btn btn-primary">Book Meeting</button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DurationModal;
