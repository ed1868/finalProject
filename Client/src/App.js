import React, { Component } from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom'
import AuthService from "./components/auth/AuthService"
import Signup from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import Cases from "./components/Cases/Cases"
import CasesNew from "./components/Cases/CasesNew";


import Navbar from "./components/Navbar/Navbar"

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
        <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/signup"  render={() => <Signup getUser={this.getUser} ></Signup>} />
        <Route exact path="/login"   render={() => <Login getUser={this.getUser} />}/>
        <Route exact path="/logout" component={this.getUser} />
        <Route exact path="/cases"   render={() => <Cases getUser={this.getUser} />}/>
        <Route exact path="/cases/new"   render={() => <CasesNew getUser={this.getUser} />}/>
        {/* <Route exact path="/cases/:id" component={}/> 
        <Route exact path="/community" component={} />
        <Route exact path="/user-profile" component={} /> */}
      </Switch>
      </div>  


    );
  }
}

export default App;
