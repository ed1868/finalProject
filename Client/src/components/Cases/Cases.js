import React, { Component } from "react";
import axios from "axios";

const casesApi = axios.create({
  baseURL: "http://localhost:5000/cases"
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
      <div>
        <h2>Patient Cases</h2>
        {this.state.cases !== null &&
          this.state.cases.map(cases => {
            return (
              <div style={{border :"3px solid red"}}>
                <div />
                <div>
                  <h1>
                    Title : <span>{cases.title}</span>{" "}
                  </h1>
                  <h2>
                    Urgency Level : <span>{cases.urgencyLevel}</span>
                  </h2>
                </div>
                <div>
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
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}
