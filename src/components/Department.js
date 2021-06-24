import React, { Component } from 'react'
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import ModalAddDepartment from './ModalAddDepartment'
import ModalEditDepartment from './ModalEditDepartment'
export default class Department extends Component {
    constructor(props) {
        super(props);
        this.state = { deps: [], modalAddDepShow: false, modalEditDepShow: false }
    }

    componentDidMount() {/*this.getFakeData()*/ this.getRealData() }

    componentDidUpdate() { this.getRealData() }

    getFakeData() {
        this.setState({
            deps: [{ "ID": 1, "DepartmentName": "IT" }, { "ID": 3, "DepartmentName": "Finance" }, { "ID": 2, "DepartmentName": "HR" }]
        });
    }

    getRealData() {
        fetch('https://localhost:44310/api/Department/')
            .then(response => response.json())
            .then(data => this.setState({ deps: data }));
    }

    deleteDepartment(depID) {
        const requestOpt = { method: "DELETE", headers: { 'Content-Type': 'application/json' } }

        if (window.confirm("Are you sure?")) {

            fetch('https://localhost:44310/api/Department/' + depID, requestOpt)
        }
    }

    render() {
        const { deps, depID, depName } = this.state;
        let addModalClose = () => { this.setState({ modalAddDepShow: false }) }
        let editModalClose = () => { this.setState({ modalEditDepShow: false }) }

        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Department ID</th>
                            <th>Department Name</th>
                            <th>Option</th>

                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(d =>
                            <tr key={d.ID}>
                                <td>{d.ID}</td>
                                <td>{d.DepartmentName}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button onClick={() => { this.setState({ modalEditDepShow: true, depID: d.ID, depName: d.DepartmentName }) }}>Edit</Button>
                                        <Button className="mx-2" onClick={() => { this.deleteDepartment(d.ID) }} variant="danger" >Delete</Button>
                                    </ButtonToolbar>
                                    <ModalEditDepartment show={this.state.modalEditDepShow} onHide={editModalClose} depID={depID} depName={depName} />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button onClick={() => { this.setState({ modalAddDepShow: true }) }} >Add Department</Button>
                </ButtonToolbar>
                <ModalAddDepartment show={this.state.modalAddDepShow} onHide={addModalClose} />
            </div>
        )
    }
}
