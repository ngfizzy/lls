import React from 'react'
import { Button, Form, FormControl, Row } from 'react-bootstrap'
import Nav from 'react-bootstrap/esm/Nav'
import Navbar from 'react-bootstrap/esm/Navbar'
// import NavDropdown from 'react-bootstrap/esm/NavDropdown'
import { Link } from 'react-router-dom'

export function GeneralNavbar() {
    return (
        <Navbar bg="primary" className="text" expand="lg">
        <Navbar.Brand href="#home">
            <span className="text-light text-bold">LLS</span>
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
              <Nav.Link as={Link} to="admin">
                 <span className="text-light">Admin</span>
              </Nav.Link>
              <Nav.Link as={Link} to="member">
                 <span className="text-light">Member Poral</span>
              </Nav.Link>

            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Row>
          <Form className="col-sm-12 col-md-7">
            <Row>
              <FormControl  type="text" placeholder="Search" className="col-sm-12 col-md-7" />
              <div className="col-sm-12 col-md-3">
                <Button  variant="outline-light" >Search</Button>
              </div>

           </Row>
          </Form>
            <Button className="col-sm-12 col-md-3" variant="secondary">Logout</Button>
          </Row>
        </Navbar.Collapse>
      </Navbar>
    )
}
