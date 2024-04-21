import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import UserDashboard from '../../components/userDashboard';
import PredictDecease from "./Diagnose";
import Chatbot from '../../components/chatbot';

function UserPage(){

    const [active, setActive] = useState("Form");
    const navigate = useNavigate();

    const handleLogoutClick = () => {
      // Remove token and tokenExpiration from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
      localStorage.removeItem('phone');
      
      navigate('/');
      // Reload the page
      window.location.reload();
    }

    const handleFormClick = () => {
        setActive("Form");
    }

    const handleChatbotClick = () => {
        setActive("Chatbot");
    }

    return(
        <div style={{ display: 'flex', height: '100vh', flexWrap: "wrap"}}>
            <Container fluid>
                <Row style={{ height: '100%' }}>
                    {/* Sidebar */}
                    <Col md={3} className="bg-dark text-white sidebar">
                        <Card className="bg-dark text-white" style={{ height: '100%' }}>
                            <Card.Body>
                                <Card.Title>Menu</Card.Title>
                                {/* Section 1 */}
                                <Card.Text>
                                    <Button
                                        variant="link"
                                        className="text-white"
                                        style={{ textDecoration: 'none', fontWeight: 'normal' }}
                                        onClick={handleFormClick}
                                    >
                                        Health Issue Reporting
                                    </Button>
                                </Card.Text>
                                {/* Section 2 */}
                                <Card.Text>
                                    <Button
                                        variant="link"
                                        className="text-white"
                                        style={{ textDecoration: 'none', fontWeight: 'normal' }}
                                        onClick={handleChatbotClick}
                                    >
                                        Chatbot
                                    </Button>
                                </Card.Text>

                                {/* Section 3 */}
                                <Card.Text>
                                    <Button
                                        variant="link"
                                        className="text-white"
                                        style={{ textDecoration: 'none', fontWeight: 'normal' }}
                                        onClick={handleLogoutClick}
                                    >
                                        Logout
                                    </Button>
                                </Card.Text>

                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Main Content */}
                    <Col md={9} className="main-content">
                        {/* Conditional Rendering based on active section */}
                        {active === 'Form' && (
                            <UserDashboard/>
                        )}
                        {active === 'Chatbot' && (
                            <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
                                {/* Apply styles to limit width and handle overflow */}
                                <Chatbot/>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default UserPage;
