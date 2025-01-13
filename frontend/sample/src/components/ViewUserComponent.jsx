import React,{Component} from 'react';
import UserService from "../services/UserService";

class ViewUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state={
            id: this.props.match.params.id,
            user:{}
        }
    }

    componentDidMount(){
        UserService.getUserById(this.state.id).then(res=> {
            this.setState({user:res.data});
        })
    }

    render(){
        return (
            <div>
                <br></br>
                <div className ="card col-md-6 offset-md-3">
                    <h3 className ="text-center">View Student Detail</h3>
                    <div className="card-body">
                        <div className="row">
                            <label> First Name:</label>
                            <div>{this.state.user.firstName}</div>
                        </div>
                        <div className="row">
                            <label> Last Name:</label>
                            <div>{this.state.user.lastName}</div>
                        </div>
                        <div className="row">
                            <label> Phone Number:</label>
                            <div>{this.state.user.phoneNumber}</div>
                        </div>
                        <div className="row">
                            <label> Email ID:</label>
                            <div>{this.state.user.emailId}</div>
                        </div>
                        <div className="row">
                            <label> PRN:</label>
                            <div>{this.state.user.prn}</div>
                        </div>
                        <div className="row">
                            <label> Year:</label>
                            <div>{this.state.user.year}</div>
                        </div>
                        <div className="row">
                            <label> Degree:</label>
                            <div>{this.state.user.degree}</div>
                        </div>
                        <div className="row">
                            <label> Department:</label>
                            <div>{this.state.user.department}</div>
                        </div>
                        <div className="row">
                            <label> CGPA:</label>
                            <div>{this.state.user.cgpa}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewUserComponent