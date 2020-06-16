import React from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import {withContext} from '../../1_context';


function Navigation(props) {
    return (
        <Navbar expand="lg" fixed={'top'}>
            <Navbar.Brand onClick={() => props.history.push('/')}><code><i className="fab fa-ethereum"></i> Supply Chain Manager</code></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <NavDropdown title="Menu" id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={() => props.history.push('/deploy')}>
                        <code><i className="fas fa-file-export"></i> Deploy a Contract</code>
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => props.history.push('/manage')}>
                        <code><i className="fas fa-file-signature"></i> Manage a Contract</code>
                    </NavDropdown.Item>
                </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default withRouter(withContext(Navigation));