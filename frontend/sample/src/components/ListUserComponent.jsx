import React, { Component } from 'react';
import UserService from '../services/UserService';

class ListUserComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };

        this.addUser = this.addUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.viewUser = this.viewUser.bind(this);
    }

    componentDidMount() {
        UserService.getUsers()
            .then((res) => {
                if (!res.data || res.data.length === 0) {
                    this.props.history.push('/add-user/_add');
                } else {
                    this.setState({ users: res.data });
                }
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
    }

    addUser() {
        this.props.history.push('/add-user/_add');
    }

    editUser(userid) {
        this.props.history.push(`/add-user/${userid}`);
    }

    deleteUser(userid) {
        UserService.deleteUser(userid).then(() => {
            this.setState({
                users: this.state.users.filter((user) => user.id !== userid),
            });
        });
    }

    viewUser(userid) {
        this.props.history.push(`/view-user/${userid}`);
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Student List</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addUser}>
                        Add Student
                    </button>
                </div>
                <br />
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Phone Number</th>
                                <th>Email ID</th>
                                <th>PRN</th>
                                <th>Year</th>
                                <th>Degree</th>
                                <th>Department</th>
                                <th>CGPA</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>{user.emailId}</td>
                                    <td>{user.prn}</td>
                                    <td>{user.year}</td>
                                    <td>{user.degree}</td>
                                    <td>{user.department}</td>
                                    <td>{user.cgpa}</td>
                                    <td>
                                        <button
                                            onClick={() => this.editUser(user.id)}
                                            className="btn btn-info"
                                        >
                                            Update
                                        </button>
                                        <button
                                            style={{ marginLeft: '10px' }}
                                            onClick={() => this.deleteUser(user.id)}
                                            className="btn btn-danger"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            style={{ marginLeft: '10px' }}
                                            onClick={() => this.viewUser(user.id)}
                                            className="btn btn-info"
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListUserComponent;
