import React from 'react'
import { Button, Form, FormControl } from 'react-bootstrap'
import Nav from 'react-bootstrap/esm/Nav'
import Navbar from 'react-bootstrap/esm/Navbar'
// import NavDropdown from 'react-bootstrap/esm/NavDropdown'
import { Link } from 'react-router-dom'

export function GeneralNavbar() {
    return (
        <Navbar bg="primary" expand="lg">
        <Navbar.Brand href="#home">LLS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
              <Nav.Link as={Link} to="admin">
                 Admin
              </Nav.Link>
              <Nav.Link as={Link} to="member">
                 Member 
              </Nav.Link>

            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Form inline className="mr-2">
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
          </Form>
          <Button variant="light" >Logout</Button>
        </Navbar.Collapse>
      </Navbar>
    )
}
