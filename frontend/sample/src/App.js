import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import React from 'react'
import HeaderComponent from './components/HeaderComponent';
import ListUserComponent from './components/ListUserComponent';
import CreateUserComponent from './components/CreateUserComponent';
import ViewUserComponent from './components/ViewUserComponent';
import UpdateUserComponent from './components/UpdateUserCompontent';
function App() {
  return (
    <div className="App">
      <Router>
        <HeaderComponent/>
        <div className = 'continer'>
          <Switch>
            <Route path="/" exact component={ListUserComponent}></Route>
            <Route path="/users" exact component={ListUserComponent}></Route>
            <Route path="/add-user/:id" component ={CreateUserComponent}></Route>
            <Route path= "/view-user/:id" component ={ViewUserComponent}></Route>
            <Route path= "/update-user/:id" component ={UpdateUserComponent}></Route>
          </Switch>
        </div>
      </Router>
    
    </div>
  );
}

export default App;
