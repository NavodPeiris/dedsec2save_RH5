import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

function LandingPage(){

    return(
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100vh' }}>
            <Container fluid style={{ flexGrow: 1, position: 'relative' }}>
                <Row className="justify-content-center align-items-center" style={{ height: '100%' }}>
                    <Col xs={12} className="text-center position-relative">
                        <img src="/land.jpeg" alt="Land" style={{ maxWidth: '100%', height: 'auto', filter: 'brightness(70%)' }} />
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#fff', zIndex: 1 }}>
                            <h1>Welcome to MediLitics</h1>
                            <p>We Provide Healthcare Analytics and Monitoring Services</p>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row className="justify-content-center align-items-center">
                    <Col xs={12} className="text-center">
                        <p>&copy; 2024 Your Company. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default LandingPage;
