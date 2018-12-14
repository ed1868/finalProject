import { Redirect } from "react-router-dom";
import React, { Component } from "react";
import Symptoms from "./Symptoms/Symptoms"




export default class Cases extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      title: "",
      description: "",
      comments: "",
      url: "",
      symptomsOne: "",
      symptomsTwo: "",
      symptomsThree: "",
      symptomsFour: "",
      symptomsFive: "",
      timeframe: "",
      urgencyLevel: "",
      rateOfPain: "",
      systolic: "",
      diastolic: "",
      pulse: "",
      oxygen: "",
      redirect: false,
      selectedOption: null
    };
    // this.authService = new AuthService();
  }

  handleFormSubmit = e => {
    e.preventDefault();

    const {
      title,
      description,
      comments,
      url,
      symptomsOne,
      symptomsTwo,
      symptomsThree,
      symptomsFour,
      symptomsFive,
      timeframe,
      urgencyLevel,
      rateOfPain,
      systolic,
      diastolic,
      pulse,
      oxygen,
      redirect
    } = this.state;

    this.case
      .signup({
        title,
        description,
        comments,
        url,
        symptomsOne,
        symptomsTwo,
        symptomsThree,
        symptomsFour,
        symptomsFive,
        timeframe,
        urgencyLevel,
        rateOfPain,
        systolic,
        diastolic,
        pulse,
        oxygen,
        redirect
      })
      .then(user => {
        this.props.getUser(user);
        this.setState({
          title: "",
          description: "",
          comments: "",
          url: "",
          symptomsOne: "",
          symptomsTwo: "",
          symptomsThree: "",
          symptomsFour: "",
          symptomsFive: "",
          timeframe: "",
          urgencyLevel: "",
          rateOfPain: "",
          systolic: "",
          diastolic: "",
          pulse: "",
          oxygen: "",
          redirect: false
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

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  render() {
    const { selectedOption } = this.state;

    if (this.state && this.state.redirect) {
      return <Redirect to="/" />;
    } else {
      return (
        <div>
          <form onSubmit={this.handleFormSubmit}>
            <label>Case Title : </label>
            <input
              type="text"
              name="case"
              onChange={e => this.handleChange(e)}
            />
            <br />
            <label>Urgency Level : </label>
            <input type="number" name="urgencyLevel" />
            <br />
            <br />
            <label>Symptoms : </label>
            <br />
            <Symptoms />
            {/* <input
              type="text"
              name="symptomsOne"
              onChange={e => this.handleChange(e)}
            />
            <br />
            <input
              type="text"
              name="symptomsTwo"
              onChange={e => this.handleChange(e)}
            />
            <br />
            <input
              type="text"
              name="symptomsThree"
              onChange={e => this.handleChange(e)}
            />
            <br />
            <input
              type="text"
              name="symptomsFour"
              onChange={e => this.handleChange(e)}
            />
            <br />
            <input
              type="text"
              name="symptomsFive"
              onChange={e => this.handleChange(e)}
            /> */}
            <br />
            <label>Time Frame Of Symptoms : </label>
            <br />
            <input
              type="text"
              name="name"
              onChange={e => this.handleChange(e)}
            />
            <br />
            <div>
              <label>Vital Signs : </label>
            </div>
            <br />
            <div>
              <label>Systolic : </label>
              <input type="number" name="systolic" />
            </div>
            <div>
              <label>Diastolic : </label>
              <input type="number" name="diastolic" />
            </div>
            <div>
              <label>Oxygen : </label>
              <input type="number" name="oxygen" />
            </div>
            <div>
              <br />
              <label>Image : </label>
              <input
                type="file"
                name="url"
                onChange={e => this.handleChange(e)}
              />
            </div>
            <br />
            <div>
              <label>Rate Of Pain : </label>
              <input
                type="number"
                name="rateOfPain"
                onChange={e => this.handleChange(e)}
              />
            </div>
            <br />
            <div>
              <label>Description : </label>

              <textarea
                name="description"
                placeholder="41 Year Old Male w/ has Suffered Blunt Force Trauma To frontal lobe"
              />
            </div>

            <input type="submit" value="Cases" />
          </form>
        </div>
      );
    }
  }
}
