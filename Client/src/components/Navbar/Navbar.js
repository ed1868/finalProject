import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../auth/AuthService";
import Logo from "../images/pulse-heartbeat-rate-heart-love-medical-2-58385.png";
import "./navbar.css";

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { loggedInUser: this.props["userInSession"] };
    this.service = new AuthService();
  }

  willReceiveProps(props) {
    this.setState({ ...this.state, loggedInUser: this.props["userInSession"] });
  }

  logOutHandler = e => {
    this.props.logout();
  };

  componentDidMount() {
    //this.willReceiveProps();
  }

  render() {
    console.log(this.props.userInSession);
    if (this.props.userInSession != null) {
      console.log("esteeee", this.state.loggedInUser);
      return (
        <div>
          <nav className="navbar navbar-expand">
            <div className="container-fluid">
              <div className="navbar-header">
                <Link to="/" className="navbar-brand">
                  <img id="logo" src={Logo} alt="vitality" />
                </Link>
              </div>
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <Link to="/cases">Cases</Link>
                </li>
                <li>
                  <Link to="/community">Community</Link>
                </li>
                <li>
                  <Link to="/logout">
                    <a onClick={this.logOutHandler}>Logout</a>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      );
    } else {
      return (
        <div>
          <nav className="navbar navbar-expand">
            <div className="container-fluid">
              <div className="navbar-header">
                <Link to="/" className="navbar-brand">
                  <img id="logo" src={Logo} alt="vitality" />
                </Link>
              </div>
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <Link to="/signup">SignUp</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/cases">Cases</Link>
                </li>
                <li>
                  <Link to="/community">Community</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      );
    }
  }
}
