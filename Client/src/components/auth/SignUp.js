import React, { Component } from "react";
import AuthService from "./AuthService";
import { Redirect } from "react-router-dom";

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
        <h2>Signup</h2>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username :</label>
          <input
            type="text"
            name="username"
            onChange={e => this.handleChange(e)}
          />

          <label>Email :</label>
          <input type="email" name="email" onChange={e => this.handleChange(e)} />

          <label>Name :</label>
          <input
            type="text"
            name="name"
            onChange={e => this.handleChange(e)}
          />

          <label>Password :</label>
          <input
            type="password"
            name="password"
            onChange={e => this.handleChange(e)}
          />
          <label>Photo Url</label>
          <input type="file" name="url" onChange={e => this.handleChange(e)} />

          <label>Date Of Birth : </label>
          <input type="date" name="dob" onChange={e => this.handleChange(e)} />

          <label>Physician Medical Lincense Number : </label>
          <input
            type="number"
            name="medicalLicenseNumber"
            onChange={e => this.handleChange(e)}
          />

          <label>Gender : </label>
          {/* <select name="gender">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select> */}
          <input type="text" name="gender" placeholder="Male, Female or Other.." onChange={e => this.handleChange(e)} />
          
          <label>Medical Experience : </label>
          <input type="number" name="experience"  onChange={e => this.handleChange(e)} />
          
          <input type="submit" value="Signup" />
        </form>
      </div>
    );
  }
}

