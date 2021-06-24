import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap';


export default class Navigation extends Component {
    render() {
        return (
            <Navbar bg="primary" variant="dark" className="mb-4">
                <Navbar.Brand href="/home">Navbar</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/department">Department</Nav.Link>
                    <Nav.Link href="/employee">Employee</Nav.Link>
                </Nav>

            </Navbar>
        )
    }
}
