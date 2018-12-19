import React, { Component } from "react";
import {Link} from "react-router-dom"
import axios from "axios";
import './cases.css'

const casesApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/cases`,
  withCredentials: true
});

export default class Cases extends Component {
  constructor() {
    super();
    this.state = {
      cases: null
    };
  }

  componentDidMount() {
    casesApi
      .get()
      .then(responseFromAPI => {
        this.setState({ ...this.state, cases: responseFromAPI.data.cases });
        console.log("Response from API is: ", responseFromAPI.data);
      })
      .catch(err => {
        console.log("Error is: ", err);
      });
  }

  render() {
    return (
      <div id="casePage">
        <h2 id="patientHeader"><ion-icon id="pulseStart" name="pulse"></ion-icon> Patient Cases<ion-icon id="pulseEnd" name="pulse"></ion-icon> </h2> 
        <br></br>
        <Link id="link" to="/cases/add/new" ><ion-icon size="large" name="add-circle-outline"></ion-icon></Link>
        
        {this.state.cases !== null &&
          this.state.cases.map(cases => {
            return (
  
              <div className="row" id="casesEach">
                <div className="col-md-12">
                <br></br>
                  <h1>
                    <Link to={`cases/${cases._id}`}>{cases.title}</Link>
                  </h1>
                  <h2>
                    Urgency Level : <span id="red">{cases.urgencyLevel}</span>
                  </h2>
                  <hr></hr>
                </div>
                {/* <div>
                  <img src={cases.url} />
                </div>
                <div>
                  <h3>
                    Symptoms : <span>{cases.symptoms}</span>
                  </h3>
                </div>
                <div>
                  <h3>
                    TimeFrame : <span>{cases.timeframe}</span>
                  </h3>
                </div>
                <div>
                  <div style={{ border: "1px solid black" }}>
                    <h2>Vital Signs</h2>
                    <ul>
                      <li>
                        Systolic : <span>{cases.systolic}</span>
                      </li>
                      <li>
                        Diastolic : <span>{cases.diastolic}</span>
                      </li>
                      <li>
                        Oxygen : <span>{cases.oxygen}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h2>Rate Of Pain 1 - 10 : {cases.rateOfPain}</h2>
                </div>
                <div>
                  <p>{cases.description}</p>
                  <quote>{cases.author}</quote>
                </div> */}
              </div>
 
            );
          })}
           
      </div>
    );
  }
}
