import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function HomeNav() {
    return (
        <Navbar expand="lg" bg="light" className="py-3 shadow-sm" id="top">
            <div className="container">
                <Navbar.Brand href="#"></Navbar.Brand>
                <Navbar.Toggle aria-controls="navmenu" />
                <Navbar.Collapse id="navmenu">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/" className="font-monospace">About Me</Nav.Link>
                        <Nav.Link as={NavLink} to="/projects" className="font-monospace">Projects</Nav.Link>
                        <Nav.Link href="/home/media/Michael_Ortega_resume.pdf" className="font-monospace" target="_blank" rel="noopener noreferrer">Resume</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
}

export default HomeNav;
