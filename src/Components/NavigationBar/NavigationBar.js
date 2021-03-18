import React, {useState, useEffect} from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';
import classes from './NavigationBar.module.css';



const NavigationBar = props => {
    return (
        <div>
            <Navbar collapseOnSelect fixed='top' expand='sm' bg='dark' variant='dark'>
                <Container>
                    <Navbar.Brand href="/">Rasaan Hollis</Navbar.Brand>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav>
                            <Nav.Link href='/'>Home</Nav.Link>
                            <Nav.Link href='/Resolvve'>Resolvve</Nav.Link>
                            <Nav.Link href='/Hash'>Visual HashMap</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavigationBar;