import { Redirect } from "react-router-dom";
import React, { Component } from "react";


import CaseService from './CaseService'




export default class Cases extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      title: "",
      description: "",
      comments: "",
      url: "",
      symptoms: "",
      timeframe: "",
      urgencyLevel: "",
      rateOfPain: "",
      systolic: "",
      diastolic: "",
      oxygen: "",
      redirect: false,
      selectedOption: null
    };
    this.CaseService = new CaseService();
  }

  handleFormSubmit = e => {
    e.preventDefault();

    const {
      title,
      description,
      comments,
      url,
      symptoms,
      timeframe,
      urgencyLevel,
      rateOfPain,
      systolic,
      diastolic,
      oxygen,
      redirect
    } = this.state;

    this.CaseService
    .addCase({
      title,
      description,
      comments,
      url,
      symptoms,
      timeframe,
      urgencyLevel,
      rateOfPain,
      systolic,
      diastolic,
      oxygen,
      redirect
    })
    .then(cases => {

      this.setState({
        title: "",
        description: "",
        comments: "",
        url: "",
        symptoms: "",
        timeframe: "",
        urgencyLevel: "",
        rateOfPain: "",
        systolic: "",
        diastolic: "",
        oxygen: "",
        redirect: false,
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
    } else {
      return (
        <div>
          <h1>Add a Case</h1>
        <div className="row justify-content-md-center text-center">
          <div className="col-md-6">
        <form onSubmit={this.handleFormSubmit}>

        <label htmlFor="title">Case Title : </label>
                <input
                  autoComplete="off"
                  className="form-control"
                  id="title"
                  name="title"
                  onChange={e => this.handleChange(e)}
                  type="text"
                />
                
                <label htmlFor="urgencyLevel">Urgency Level : </label>
                <input
                  autoComplete="off"
                  className="form-control"
                  id="urgencyLevel"
                  name="urgencyLevel"
                  onChange={e => this.handleChange(e)}
                  type="number"
                />
                <label htmlFor="symptoms">Symptoms : </label>
                <input
                  autoComplete="off"
                  className="form-control"
                  id="symptoms"
                  name="symptoms"
                  onChange={e => this.handleChange(e)}
                  type="text"
                />
                <label htmlFor="timeframe">Time Frame Of Symptoms : </label>
                <input
                  autoComplete="off"
                  className="form-control"
                  id="timeframe"
                  name="timeframe"
                  onChange={e => this.handleChange(e)}
                  type="text"
                />
                <h3>Vital Signs</h3>
                <br></br>
                <label htmlFor="systolic">Systolic : </label>
                <input
                  autoComplete="off"
                  className="form-control"
                  id="systolic"
                  name="systolic"
                  onChange={e => this.handleChange(e)}
                  type="number"
                />
                <label htmlFor="diastolic">Diastolic : </label>
                <input
                  autoComplete="off"
                  className="form-control"
                  id="diastolic"
                  name="diastolic"
                  onChange={e => this.handleChange(e)}
                  type="number"
                />

                <label htmlFor="oxygen">Oxygen : </label>
                <input
                  autoComplete="off"
                  className="form-control"
                  id="oxygen"
                  name="oxygen"
                  onChange={e => this.handleChange(e)}
                  type="number"
                />

                <label htmlFor="gender">Image : </label>
                <br></br>
                <input
                type="file"
                name="url"
                onChange={e => this.handleChange(e)}
              />
                <br></br>
                <label htmlFor="rateOfPain">Rate Of Pain : </label>
                <input
                  autoComplete="off"
                  className="form-control"
                  id="rateOfPain"
                  name="rateOfPain"
                  onChange={e => this.handleChange(e)}
                  type="number"
                />
                <br></br>
                <label htmlFor="description">Description : </label>
                <textarea
                  autoComplete="off"
                  className="form-control"
                  id="description"
                  name="description"
                  placeholder="41 Year Old Male w/ has Suffered Blunt Force Trauma To frontal lobe"
                  onChange={e => this.handleChange(e)}
                  type="number"
                />
          
          <input type="submit" value="Cases" />
        </form>
        </div>
        </div>
        </div>
      );
    }
  }
}

