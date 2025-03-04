import React, { useContext, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { WaitingListContext } from '../context/WaitingListContext';

const WaitingListModal = () => {
  const { hasJoinedWaitingList, joinWaitingList } = useContext(WaitingListContext);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [showModal, setShowModal] = useState(!hasJoinedWaitingList);

  const handleClose = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    fetch('https://api.example.com/waiting-list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert('Thank you for signing up!');
          joinWaitingList();
          setFormData({ name: '', email: '' });
          handleClose();
        } else {
          alert('Something went wrong. Please try again.');
        }
      })
      .catch(() => {
        alert('Network error. Please try again.');
      });
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Join the Waiting List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default WaitingListModal;
