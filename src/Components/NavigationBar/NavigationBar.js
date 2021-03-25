import React, {useState, useEffect} from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classes from './NavigationBar.module.css';

const NavigationBar = props => {
    const [navOpen, setNavOpen] = useState(false);
    const toggOpen = () => {
        let bool = navOpen;
        setNavOpen(!bool);
    }
    return (
        <div>
            <Navbar collapseOnSelect fixed='top' expand='sm' expanded={navOpen} bg='dark' variant='dark'>
                <Container>
                    <Navbar.Brand onClick={() => {setNavOpen(false)}} as={Link} to="/">Rasaan Hollis</Navbar.Brand>
                    <Navbar.Toggle onClick={toggOpen} aria-controls='responsive-navbar-nav' />
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav>
                            <Nav.Link className={classes.link} as={Link} onClick={toggOpen} to='/'>Home</Nav.Link>
                            <Nav.Link className={classes.link} as={Link} onClick={toggOpen} to='/Resolvve'>Resolvve</Nav.Link>
                            <Nav.Link className={classes.link} as={Link} onClick={toggOpen} to='/Hash'>Visual HashMap</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavigationBar;