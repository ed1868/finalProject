import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import AuthService from "../auth/AuthService";
import Signup from "../auth/SignUp";
import Login from "../auth/Login";
import Cases from "../Cases/Cases";
import CasesNew from "../Cases/CasesNew";
import { Provider } from "react-redux";
import { configureStore } from "../Store";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const store = configureStore();

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: null
    };

    this.authService = new AuthService();

    this.fetchUser();
  }

  fetchUser = () => {
    this.authService
      .loggedin()
      .then(user => this.setState({ ...this.state, user }));
  };

  getUser = user => {
    this.setState({ ...this.state, user });
  };



  logout = () => {
    this.authService
      .logout()
      .then(() => this.setState({ ...this.state, user: null }));
  };

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Switch>
              <Route
                exact
                path="/signup"
                render={() => <Signup getUser={this.getUser} />}
              />
              <Route
                exact
                path="/login"
                render={() => <Login getUser={this.getUser} />}
              />
              <Route exact path="/logout" component={this.getUser} />
              <Route
                exact
                path="/cases"
                render={() => <Cases getUser={this.getUser} />}
              />
              <Route
                exact
                path="/cases/new"
                render={() => <CasesNew getUser={this.getUser} />}
              />

              {/* <Route exact path="/cases/:id" component={}/> 
        <Route exact path="/community" component={} />
        <Route exact path="/user-profile" component={} /> */}
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
