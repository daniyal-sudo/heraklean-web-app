import React from 'react';
import { Button } from 'react-bootstrap';
import { FaPaperPlane, FaWhatsapp } from 'react-icons/fa';

const SendPlan = () => {
  return (
    <div className="d-flex align-items-center gap-3 send-plane-section">
      <Button variant="primary" className="d-flex align-items-center">
        <FaPaperPlane className="me-2" /> Send Plan
      </Button>
      <Button variant="dark" className="d-flex align-items-center">
        <FaWhatsapp style={{ color: '#25D366' }} /> {/* WhatsApp Icon in green */}
      </Button>
    </div>
  );
};

export default SendPlan;
