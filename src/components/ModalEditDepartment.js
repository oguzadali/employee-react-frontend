import React, { Component } from 'react'
import { Modal, Button, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';


export default class ModalEditDepartment extends Component {

    constructor(props) {
        super(props); this.state = { openSnackBar: false, msgSnackBar: " " };
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    closeSnackBar = () => {
        this.setState({ openSnackBar: false })
    }

    handleSubmit(e) {
        e.preventDefault(); alert(e.target.DepartmentName.value);
        const requestOpt = {
            method: "PUT", headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ID: e.target.ID.value, DepartmentName: e.target.DepartmentName.value })
        }


        fetch('https://localhost:44310/api/department', requestOpt)
            .then(response => response.json())
            .then(
                (data) => { this.setState({ openSnackBar: true, msgSnackBar: ` ${data}` /* API returns message already */ }) },
                (error) => { this.setState({ openSnackBar: true, msgSnackBar: " Could not add department" }) });

    }

    render() {
        return (
            <div className="container">
                <Snackbar
                    anchorOrigin={{ vertical: "center", horizontal: "center" }}
                    open={this.state.openSnackBar}
                    onClose={this.closeSnackBar}
                    autoHideDuration={5000}
                    message={<span id="message-id">{this.state.msgSnackBar}</span>}
                    action={[<IconButton key="close" aria-label="Close" color="inherit " onClick={this.closeSnackBar}>X</IconButton>]}
                />



                <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Department
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Department ID</Form.Label>
                                        <Form.Control type="text" name="ID" disabled defaultValue={this.props.depID} required placeholder="DepartmentID" />
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Department Name</Form.Label>
                                        <Form.Control type="text" name="DepartmentName" required defaultValue={this.props.depName} placeholder="DepartmentName" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">Update</Button>
                                    </Form.Group>
                                </Form>

                            </Col>
                        </Row>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onHide} >Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
