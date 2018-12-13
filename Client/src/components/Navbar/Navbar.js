import React, { Component } from "react";
import { Link } from 'react-router-dom';
import AuthService from '../auth/AuthService';
import AppBar from '@material-ui/core/AppBar';

export default class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state={ loggedInUser: null};
    this.service = new AuthService();
  }
   willReceiveProps(elProp){
     this.setState({...this.state, loggedInUser: elProp["userInSession"] })
   }

   logOutHandler = (e) =>{
     this.props.logout();
   }
  render() {
    if(this.state.loggedInUser){ 
    return (
      <div>
        <nav className="nav-style">
          <ul>
            <li><a onClick={this.logOutHandler}>LogOut Broski</a></li>
          </ul>
          <h1>Welcome, {this.state.loggedInUser.username}</h1>
        </nav>
      </div>
    )
  } else {
    return (
      <div>
        <nav className="nav-style">
          <ul>
            <li><Link to='/signup'>SignUp Playa</Link></li>
            <li><Link to='/login'>Login Playa</Link></li>
          </ul>
        </nav>
      </div>
    ) 
  }
}
}