import React from "react";
import "./../css/homepage.css";
import { Container, Row, Col, Image, Button } from "react-bootstrap";

function HomePage() {
  return (
    <div>
      <Container fluid>
        <Row>
          <Col>
            <Image src="travellers.svg" fluid className="homepage-image" />
          </Col>
          <Col>
            <div className="homepage-text">
              <h2>Book your tickets with</h2>
              <h2 className="site-name">TicketAdda</h2>
              <p>
                TicketAdda is a comprehensive ticket management site designed
                for both transport providers and passengers. Our platform
                streamlines travel planning with an intuitive user interface and
                a wide range of features, including online ticket purchasing and
                real-time schedule updates. With TicketAdda, you can travel with
                confidence, knowing that your trip is in good hands.
              </p>
              <div className="homepage-buttons">
                <Button variant="outline-primary" className="mr-2">
                  Enter as Passenger
                </Button>
                <Button variant="outline-primary" className="ml-2">
                  Enter as Provider
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;
