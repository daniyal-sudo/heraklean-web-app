import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const CommonForm = () => {
  const [dayForm, setDayForm] = useState({
    title: '',
    generalNotes: '',
    warmUp: ''
  });

  const handleDayFormChange = (e) => {
    const { name, value } = e.target;
    setDayForm({ ...dayForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted', dayForm);
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4 creative-program">
      <h4>Create Program Plan</h4>

      {/* Program Title */}
      <Form.Group className="mb-4">
        <Form.Label>Program Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={dayForm.title}
          onChange={handleDayFormChange}
          placeholder="Type"
          required
        />
      </Form.Group>

      {/* General Notes */}
      <Form.Group className="mb-4">
        <Form.Label>General Notes</Form.Label>
        <Form.Control
          as="textarea"
          name="generalNotes"
          value={dayForm.generalNotes}
          onChange={handleDayFormChange}
          rows={3}
          placeholder="Type"
          required
        />
      </Form.Group>

      {/* Warm Up */}
      <Form.Group className="mb-4">
        <Form.Label>Warm Up</Form.Label>
        <Form.Control
          as="textarea"
          name="warmUp"
          value={dayForm.warmUp}
          onChange={handleDayFormChange}
          rows={3}
          placeholder="Type"
          required
        />
      </Form.Group>

      {/* Submit Button */}
      <div class="crative-button">
        <button type="submit" class="btn btn-primary">Create</button>
        <button class="btn btn-light cancel-section">Cancel</button>
      </div>
    </Form>
  );
};

export default CommonForm;
