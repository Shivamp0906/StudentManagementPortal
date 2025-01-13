import React, { Component } from 'react';
import UserService from '../services/UserService';

class UpdateUserComponent extends Component {
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
            degree:'',
            department:'',
            cgpa:''
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
        this.updateUser = this.updateUser.bind(this);
    }

    componentDidMount() {

        UserService.getUserById(this.state.id).then((res) => {
            let user = res.data;
            this.setState({
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                emailId: user.emailId,
                prn: user.prn,
                year: user.year,
                degree:user.degree,
                department:user.department,
                cgpa:user.cgpa
            });
        });
    }

    updateUser = (e) => {
        e.preventDefault();
        let user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            emailId: this.state.emailId,
            prn: this.state.prn,
            year: this.state.year,
            degree:this.state.degree,
            department:this.state.department,
            cgpa:this.state.cgpa
        };
        console.log('user => ' + JSON.stringify(user));
        console.log('id => ' + JSON.stringify(this.state.id));

        UserService.updateUser(user, this.state.id).then((res) => {
            this.props.history.push('/users'); 
        });
    };

    changeFirstNameHandler = (event) => {
        this.setState({ firstName: event.target.value });
    };

    changeLastNameHandler = (event) => {
        this.setState({ lastName: event.target.value });
    };

    changePhoneNumberHandler = (event) =>{
        this.setState({ phoneNumber: event.target.value });
    };

    changeEmailHandler = (event) => {
        this.setState({ emailId: event.target.value });
    };

    changePrnHandler = (event) => {
        this.setState({ prn: event.target.value });
    };

    changeYearHandler = (event) => {
        this.setState({ year: event.target.value });
    };

    changeDegreeHandler = (event) => {
        this.setState({ degree: event.target.value });
    };

    changeDepartmentHandler = (event) => {
        this.setState({ department: event.target.value });
    };

    changeCgpaHandler = (event) => {
        this.setState({ cgpa: event.target.value });
    };

    cancel = () => {
        this.props.history.push('/users'); 
    };

    render() {
        return (
            <div>
                <br />
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Update Student Details</h3>
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
                                        <lable>PRN</lable>
                                        <input
                                            placeholder="PRN"
                                            name="prn"
                                            className="form-control"
                                            value={this.state.prn}
                                            onChange={this.changePrnHandler}
                                        />
                                    </div>
                                    <div className= "form-group">
                                        <label>Year:</label>
                                        <input
                                            placeholder= "Year"
                                            name="year"
                                            className="form-control"
                                            value={this.state.year}
                                            onChange={this.changeYearHandler}
                                        />
                                    </div>
                                    <div className= "form-group">
                                        <label>Degree:</label>
                                        <input
                                            placeholder= "Degree"
                                            name="degree"
                                            className="form-control"
                                            value={this.state.degree}
                                            onChange={this.changeDegreeHandler}
                                        />
                                    </div>
                                    <div className= "form-group">
                                        <label>Department:</label>
                                        <input
                                            placeholder= "Department"
                                            name="departemnt"
                                            className="form-control"
                                            value={this.state.department}
                                            onChange={this.changeDepartmentHandler}
                                        />
                                    </div>
                                    <div className= "form-group">
                                        <label>CGPA:</label>
                                        <input
                                            placeholder= "CGPA"
                                            name="cgpa"
                                            className="form-control"
                                            value={this.state.cgpa}
                                            onChange={this.changeCgpaHandler}
                                        />
                                    </div>

                                    <button className="btn btn-success" onClick={this.updateUser}>
                                        Update
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
            </div>
        );
    }
}

export default UpdateUserComponent;
