import React, { Component } from "react";
import AuthService from "./AuthService";
import { Redirect } from "react-router-dom";
import './signUp.css'

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.props=props;
    
    this.state = {
      username: "",
      email: "",
      password: "",
      url: "",
      name: "",
      dob: "",
      medicalLicenseNumber: "",
      gender: "",
      experience:"",
      redirect: false
    };

    this.authService = new AuthService();
  }

  handleFormSubmit = e => {
    e.preventDefault();

    const {
      username,
      email,
      password,
      url,
      name,
      dob,
      medicalLicenseNumber,
      gender,
      experience,
      redirect
    } = this.state;

    this.authService
      .signup({
        username,
        email,
        password,
        url,
        name,
        dob,
        medicalLicenseNumber,
        gender,
        experience,
        redirect
      })
      .then(user => {
        this.props.getUser(user);
        this.setState({
          username: "",
          email: "",
          password: "",
          url: "",
          name: "",
          dob: "",
          medicalLicenseNumber: "",
          gender: "",
          experience,
          redirect: true
        });
      });
  };

  handleChange = e => {
    const { name, value } = e.target;

    if (name === "url") {
      this.setState({ ...this.state, url: e.target.files[0] });
    } else {
      this.setState({ ...this.state, [name]: value });
    }
  };

  render() {
    if (this.state && this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div>
       
        <div className="row justify-content-md-center text-center">
          <div className="col-md-4">
        <form onSubmit={this.handleFormSubmit}>
        <h2>Become Part of The [vital]ity ! </h2>
        <label htmlFor="username">Username : </label>
                <input
                  autoComplete="off"
                  className="form-control form"
                  id="username"
                  name="username"
                  onChange={e => this.handleChange(e)}
                  type="text"
                />
                
                <label htmlFor="email">Email : </label>
                <input
                  autoComplete="off"
                  className="form-control form"
                  id="email"
                  name="email"
                  onChange={e => this.handleChange(e)}
                  type="email"
                />
                <label htmlFor="name">Name : </label>
                <input
                  autoComplete="off"
                  className="form-control form"
                  id="name"
                  name="name"
                  onChange={e => this.handleChange(e)}
                  type="text"
                />
                <label htmlFor="password">Password : </label>
                <input
                  autoComplete="off"
                  className="form-control form"
                  id="password"
                  name="password"
                  onChange={e => this.handleChange(e)}
                  type="password"
                />
                <label htmlFor="url">Profile Photo : </label>
                <input className="form-control form" type="file" name="url" onChange={e => this.handleChange(e)} />

                <label htmlFor="dob">Date Of Birth : </label>
                <input
                  autoComplete="off"
                  className="form-control form"
                  id="dob"
                  name="dob"
                  onChange={e => this.handleChange(e)}
                  type="date"
                />

                <label htmlFor="medicalLicenseNumber">Medical License Number : </label>
                <input
                  autoComplete="off"
                  className="form-control form"
                  id="medicalLicenseNumber"
                  name="medicalLicenseNumber"
                  onChange={e => this.handleChange(e)}
                  type="number"
                />

                <label htmlFor="gender">Gender : </label>
                <input
                  autoComplete="off"
                  className="form-control form"
                  id="gender"
                  name="gender"
                  placeholder="Male , Female , Other"
                  onChange={e => this.handleChange(e)}
                  type="text"
                />
                <label htmlFor="experience">Years Of Experience : </label>
                <input
                  autoComplete="off"
                  className="form-control form"
                  id="experience"
                  name="experience"
                  onChange={e => this.handleChange(e)}
                  type="number"
                />
                <br></br>
          
                    <button
                  type="submit"
                  className="btn btn-dark btn-block btn-lg"
                  value="SignUp"
                >
                  Sign Up
                </button>
        </form>
        </div>
        </div>
      </div>
    );
  }
}

