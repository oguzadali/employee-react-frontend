import React, { Component } from 'react'
import { Modal, Button, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';


export default class ModalEditEmployee extends Component {

    constructor(props) {
        super(props); this.state = { openSnackBar: false, msgSnackBar: " ", deps: [] };
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    closeSnackBar = () => {
        this.setState({ openSnackBar: false })
    }

    handleSubmit(e) {
        e.preventDefault();
        const requestOpt = {
            method: "PUT", headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                EmployeeID: e.target.EmployeeID.value, EmployeeName: e.target.EmployeeName.value, Department: e.target.Department.value, MailID: e.target.MailID.value, DOJ: e.target.DOJ.value
            })
        }


        fetch('https://localhost:44310/api/employee', requestOpt)
            .then(response => response.json())
            .then(
                (data) => { this.setState({ openSnackBar: true, msgSnackBar: ` ${data}` /* API returns message already */ }) },
                (error) => { this.setState({ openSnackBar: true, msgSnackBar: " Could not add department" }) });

    }
    componentDidMount() {

        fetch('https://localhost:44310/api/Department/')
            .then(response => response.json())
            .then(data => this.setState({ deps: data }));

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
                            Edit Employee
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Employee ID</Form.Label>
                                        <Form.Control type="text" name="EmployeeID" disabled defaultValue={this.props.empID} required placeholder="DepartmentID" />
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Employee Name</Form.Label>
                                        <Form.Control type="text" name="EmployeeName" required defaultValue={this.props.empName} placeholder="--" />
                                    </Form.Group>
                                    {/* <Form.Group className="mb-2">
                                        <Form.Label>Department </Form.Label>
                                        <Form.Control type="text" name="Department" required defaultValue={this.props.empDep} placeholder="--" />
                                    </Form.Group> */}
                                    <Form.Group className="mb-2">
                                        <Form.Label>Department</Form.Label>
                                        <Form.Control name="Department" as="select">
                                            {this.state.deps.map(d => <option key={d.ID}>{d.DepartmentName}</option>)}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Department Name</Form.Label>
                                        <Form.Control type="text" name="MailID" required defaultValue={this.props.empMail} placeholder="--" />
                                    </Form.Group>

                                    <Form.Group className="mb-2">
                                        <Form.Label>Date</Form.Label>
                                        <Form.Control type="date" name="DOJ" required defaultValue={this.props.empDOJ} placeholder="DOJ" />
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
