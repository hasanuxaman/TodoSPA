import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

export default function App() {
    return (
        <>
            <div>
                <Navbar bg="info" variant="dark" expand="lg" fixed="top">
                    <Container className="d-flex align-items-center">
                        <Navbar.Brand href="/" className="me-3">My Task App</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link as={NavLink} to="/" end>
                                    Weather forecast
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/todo">
                                    ToDo
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
           

            <div>
                <Container className="pt-5">
                    <Outlet />
                </Container>
            </div>
            
        </>
    );
}
