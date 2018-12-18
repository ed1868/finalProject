import React, { Component } from "react";
import {Link} from "react-router-dom"
import axios from "axios";

const casesApi = axios.get({
  baseURL: "http://localhost:5000/cases/"
});

export default class Cases extends Component {
  constructor() {
    super();
    this.state = {
      foundCase: null
    };
  }
  
  componentDidMount() {
    casesApi
      .get()
      .then(responseFromAPI => {
        this.setState({ ...this.state, foundCase: responseFromAPI.data.foundCase });
        console.log("Response from API is: ", responseFromAPI.data);
      })
      .catch(err => {
        console.log("Error is: ", err);
      });
  }

  render() {
    return (
      <div>
        <Link to="/cases" className="btn btn-warning">All Cases</Link>
        <h2>{foundCase.title}</h2> 
            return (
              <div style={{border :"3px solid red"}}>
                <div />
                <div>
                  <h1>
                    Title : {foundCase.title}
                  </h1>
                  <h2>
                    Urgency Level : <span>{foundCase.urgencyLevel}</span>
                  </h2>
                </div>
                <div>
                  <img src={foundCase.url} />
                </div>
                <div>
                  <h3>
                    Symptoms : <span>{foundCase.symptoms}</span>
                  </h3>
                </div>
                <div>
                  <h3>
                    TimeFrame : <span>{foundCase.timeframe}</span>
                  </h3>
                </div>
                <div>
                  <div style={{ border: "1px solid black" }}>
                    <h2>Vital Signs</h2>
                    <ul>
                      <li>
                        Systolic : <span>{foundCase.systolic}</span>
                      </li>
                      <li>
                        Diastolic : <span>{foundCase.diastolic}</span>
                      </li>
                      <li>
                        Oxygen : <span>{foundCase.oxygen}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h2>Rate Of Pain 1 - 10 : {foundCase.rateOfPain}</h2>
                </div>
                <div>
                  <p>{foundCase.description}</p>
                  <quote>{foundCase.author}</quote>
                </div>
              </div>
      </div>
    );
  }
}