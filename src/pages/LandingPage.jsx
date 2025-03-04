import React, { useContext } from 'react';
import { Button, Container } from 'react-bootstrap';
import { WaitingListContext } from '../context/WaitingListContext';
import WaitingListModal from '../components/WaitingListModal';

const LandingPage = () => {
  const { hasJoinedWaitingList } = useContext(WaitingListContext);

  return (
    <div className="landing-page">
      <section className="hero-section text-center py-5">
        <Container>
          <h1 className="hero-title">Welcome to Fine Small Business</h1>
          <p className="hero-subtitle">Empowering your business with the tools you need to succeed.</p>
          {!hasJoinedWaitingList ? (
            <Button variant="primary" onClick={() => alert('Please use the modal to join the waiting list.')}>
              Join Waiting List
            </Button>
          ) : (
            <p className="text-success">You are already on the waiting list. Thank you!</p>
          )}
        </Container>
      </section>
      <WaitingListModal />
    </div>
  );
};

export default LandingPage;
