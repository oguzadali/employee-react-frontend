import React, { Component } from 'react'
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import ModalAddEmployee from './ModalAddEmployee'
import ModalEditEmployee from './ModalEditEmployee'


export default class Employee extends Component {

    constructor(props) {
        super(props);
        this.state = { emps: [], modalAddEmpShow: false, modalEditEmpShow: false }
    }

    componentDidMount() { this.getEmployees() }

    componentDidUpdate() { this.getEmployees() }

    getEmployees() {
        fetch('https://localhost:44310/api/Employee/')
            .then(response => response.json())
            .then(data => this.setState({ emps: data }));
    }

    deleteEmployee(empID) {
        const requestOpt = { method: "DELETE", headers: { 'Content-Type': 'application/json' } }

        if (window.confirm("Are you sure?")) {
            fetch('https://localhost:44310/api/Employee/' + empID, requestOpt)
        }
    }

    render() {

        const { emps, empID, empName, empDep, empMail, empDOJ } = this.state;
        let addModalClose = () => { this.setState({ modalAddEmpShow: false }) }
        let editModalClose = () => { this.setState({ modalEditEmpShow: false }) }
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Employee Name</th>
                            <th>Employee Department</th>
                            <th>Employee Mail</th>
                            <th>Date of Join</th>
                            <th>Option</th>

                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(d =>
                            <tr key={d.ID}>

                                <td>{d.EmployeeID}</td>
                                <td>{d.EmployeeName}</td>
                                <td>{d.Department}</td>
                                <td>{d.MailID}</td>
                                <td>{d.DOJ}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button onClick={() => { this.setState({ modalEditEmpShow: true, empID: d.EmployeeID, empName: d.EmployeeName, empDep: d.Department, empMail: d.MailID, empDOJ: d.DOJ }) }}>Edit</Button>
                                        <Button className="mx-2" onClick={() => { this.deleteEmployee(d.EmployeeID) }} variant="danger" >Delete</Button>
                                    </ButtonToolbar>
                                    <ModalEditEmployee show={this.state.modalEditEmpShow} onHide={editModalClose} empID={empID} empName={empName} empDep={empDep} empMail={empMail} empDOJ={empDOJ} />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button onClick={() => { this.setState({ modalAddEmpShow: true }) }} >Add Employee</Button>
                </ButtonToolbar>
                <ModalAddEmployee show={this.state.modalAddEmpShow} onHide={addModalClose} />

            </div>
        )
    }
}
