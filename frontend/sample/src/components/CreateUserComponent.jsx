import React, { Component } from 'react';
import UserService from '../services/UserService';
import { Modal, Button } from 'react-bootstrap';

class CreateUserComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            phoneNumber: '',
            emailId: '',
            prn: '',
            year: '',
            degree: '',
            department: '',
            cgpa: '',
            showModal: false, 
            modalMessage: '', 
        };

        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changePhoneNumberHandler = this.changePhoneNumberHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePrnHandler = this.changePrnHandler.bind(this);
        this.changeYearHandler = this.changeYearHandler.bind(this);
        this.changeDegreeHandler = this.changeDegreeHandler.bind(this);
        this.changeDepartmentHandler = this.changeDepartmentHandler.bind(this);
        this.changeCgpaHandler = this.changeCgpaHandler.bind(this);
        this.saveOrUpdateUser = this.saveOrUpdateUser.bind(this);
        this.cancel = this.cancel.bind(this);
        this.closeModal = this.closeModal.bind(this); 
    }

    saveOrUpdateUser(e) {
        e.preventDefault();

        if (
            this.state.firstName === '' || 
            this.state.lastName === '' || 
            this.state.phoneNumber === '' || 
            this.state.emailId === '' || 
            this.state.prn === '' || 
            this.state.year === '' ||
            this.state.degree === '' ||
            this.state.department === '' ||
            this.state.cgpa === ''
        ) {
            this.setState({ 
                modalMessage: 'Please fill in all the fields before saving!', 
                showModal: true 
            });
            return;
        }

        if (!/^[0-9]{10}$/.test(this.state.phoneNumber)) {
            this.setState({ 
                modalMessage: 'Please enter a valid 10-digit phone number.', 
                showModal: true 
            });
            return;
        }

        if (!/^[0-9]{10}$/.test(this.state.prn)) {
            this.setState({ 
                modalMessage: 'Please enter a valid 10-digit PRN.', 
                showModal: true 
            });
            return;
        }

        if (!/^\d{1,2}(\.\d{1,2})?$/.test(this.state.cgpa)) {
            this.setState({ 
                modalMessage: 'Please enter a valid CGPA (e.g., 9.5 or 10.0).', 
                showModal: true 
            });
            return;
        }

        let user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            emailId: this.state.emailId,
            prn: this.state.prn,
            year: this.state.year,
            degree: this.state.degree,
            department: this.state.department,
            cgpa: this.state.cgpa,
        };

        if (this.state.id === '_add') {
            UserService.createUser(user).then(() => {
                this.props.history.push('/users');
            });
        } else {
            UserService.updateUser(user, this.state.id).then(() => {
                this.props.history.push('/users');
            });
        }
    }

    componentDidMount() {
        if (this.state.id !== '_add') {
            UserService.getUserById(this.state.id).then((res) => {
                let user = res.data;
                this.setState({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phoneNumber: user.phoneNumber,
                    emailId: user.emailId,
                    prn: user.prn,
                    year: user.year,
                    degree: user.degree,
                    department: user.department,
                    cgpa: user.cgpa
                });
            });
        }
    }

    changeFirstNameHandler(event) {
        this.setState({ firstName: event.target.value });
    }

    changeLastNameHandler(event) {
        this.setState({ lastName: event.target.value });
    }

    changePhoneNumberHandler(event) {
        const value = event.target.value;
        const regex = /^[0-9]*$/; 
        if (regex.test(value)) {
            this.setState({ phoneNumber: value });
        }
    }

    changeEmailHandler(event) {
        this.setState({ emailId: event.target.value });
    }

    changePrnHandler(event) {
        const value = event.target.value;
        const regex = /^[0-9]*$/;
        if (regex.test(value)) {
            this.setState({ prn: value });
        }
    }

    changeYearHandler(event) {
        this.setState({ year: event.target.value });
    }

    changeDegreeHandler(event) {
        this.setState({ degree: event.target.value });
    }

    changeDepartmentHandler(event) {
        this.setState({ department: event.target.value });
    }

    changeCgpaHandler(event) {
        const value = event.target.value;
        const regex = /^\d{0,2}(\.\d{0,2})?$/;
        if (regex.test(value)) {
            this.setState({ cgpa: value });
        }
    }

    cancel() {
        this.props.history.push('/users');
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    getTitle() {
        return this.state.id === '_add' ? (
            <h3 className="text-center">Add Student</h3>
        ) : (
            <h3 className="text-center">Update Student Details</h3>
        );
    }

    render() {
        return (
            <div>
                <br />
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {this.getTitle()}
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>First Name:</label>
                                        <input
                                            placeholder="First Name"
                                            name="firstName"
                                            className="form-control"
                                            value={this.state.firstName}
                                            onChange={this.changeFirstNameHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name:</label>
                                        <input
                                            placeholder="Last Name"
                                            name="lastName"
                                            className="form-control"
                                            value={this.state.lastName}
                                            onChange={this.changeLastNameHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone Number:</label>
                                        <input
                                            type="text"
                                            placeholder="Phone Number"
                                            name="phoneNumber"
                                            className="form-control"
                                            value={this.state.phoneNumber}
                                            onChange={this.changePhoneNumberHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email:</label>
                                        <input
                                            placeholder="Email"
                                            name="emailId"
                                            className="form-control"
                                            value={this.state.emailId}
                                            onChange={this.changeEmailHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>PRN:</label>
                                        <input
                                            type="text"
                                            placeholder="PRN"
                                            name="prn"
                                            className="form-control"
                                            value={this.state.prn}
                                            onChange={this.changePrnHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Year:</label>
                                        <input
                                            placeholder="Year"
                                            name="year"
                                            className="form-control"
                                            value={this.state.year}
                                            onChange={this.changeYearHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Degree:</label>
                                        <input
                                            placeholder="Degree"
                                            name="degree"
                                            className="form-control"
                                            value={this.state.degree}
                                            onChange={this.changeDegreeHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Department:</label>
                                        <input
                                            placeholder="Department"
                                            name="department"
                                            className="form-control"
                                            value={this.state.department}
                                            onChange={this.changeDepartmentHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>CGPA:</label>
                                        <input
                                            type="text"
                                            placeholder="CGPA"
                                            name="cgpa"
                                            className="form-control"
                                            value={this.state.cgpa}
                                            onChange={this.changeCgpaHandler}
                                        />
                                    </div>
                                    <button className="btn btn-success" onClick={this.saveOrUpdateUser}>
                                        Save
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={this.cancel}
                                        style={{ marginLeft: '10px' }}
                                    >
                                        Cancel
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal for validation messages */}
                <Modal show={this.state.showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Validation Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.state.modalMessage}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default CreateUserComponent;
