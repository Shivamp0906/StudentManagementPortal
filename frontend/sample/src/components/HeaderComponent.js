import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

class HeaderComponent extends Component{
    constructor(props){
        super(props)

        this.state = {

        }

    }

    render(){
        return(
            <div>
                <header>
                    <nav className ="navbar navbar-dark bg-primary">
                        <div className="container-fluid">
                            <a href="/users" className="navbar-brand">
                            <strong>Student Management Portal</strong>
                            </a>
                        </div>
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent
