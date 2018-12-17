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
          <form onSubmit={this.handleFormSubmit}>
            <label>Case Title : </label>
            <input
              // value={this.state.title}
              type="text"
              name="title"
              onChange={e => this.handleChange(e)}
            />
            <br />
            <label>Urgency Level : </label>
            <input type="number" value={this.state.urgencyLevel}name="urgencyLevel" onChange={e => this.handleChange(e)}/>
            <br />
            <br />
            <label>Symptoms : </label>
            <br />
            <input 
              type="text"
              name="symptoms"
              // value="symptoms"
              onChange={e => this.handleChange(e)}
              />
            <br />
            <label>Time Frame Of Symptoms : </label>
            <br />
            <input
              type="text"
              name="timeframe"
              // value={this.state.timeframe}
              onChange={e => this.handleChange(e)}
            />
            <br />
            <div>
              <label>Vital Signs : </label>
            </div>
            <br />
            <div>
              <label>Systolic : </label>
              <input type="number" name="systolic" onChange={e => this.handleChange(e)}/>
            </div>
            <div>
              <label>Diastolic : </label>
              <input type="number" name="diastolic"  onChange={e => this.handleChange(e)}/>
            </div>
            <div>
              <label>Oxygen : </label>
              <input type="number" name="oxygen"  onChange={e => this.handleChange(e)}/>
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
                onChange={e => this.handleChange(e)}
              />
            </div>

            <input type="submit" value="Cases" />
          </form>
        </div>
      );
    }
  }
}

