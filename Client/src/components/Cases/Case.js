import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";



export default class Case extends Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    this.state = {
      foundCase: null,
      caseId:  this.props.match.params.id
    };
  }



  componentDidMount() {
    console.log(this.props.match.params.id);
    axios
      .get(`${process.env.REACT_APP_API_URL}/cases/${
          this.props.match.params.id
        }`,{
        withCredentials: true
      })
      .then(responseFromAPI => {
        console.log("entroooo")
        console.log(this.state)
        this.setState({
          ...this.state,
          foundCase: responseFromAPI.data.foundCase
        });
        let title= responseFromAPI.data.foundCase
        console.log(title);
        console.log("Response from API is: ", responseFromAPI.data);
      })
      .catch(err => {
        console.log("Error is: ", err);
      });
  }

  showDiv = () =>{
    return (
      <React.Fragment>
        <div style={{ border: "3px solid red" }}>
      <div />
      <div>
        <h1>Title : {this.state.foundCase.title}</h1>
        <h2>
          Urgency Level : <span>{this.state.foundCase.urgencyLevel}</span>
        </h2>
      </div>
      <div>
        <img src={this.state.foundCase.url} />
      </div>
      <div>
        <h3>
          Symptoms : <span>{this.state.foundCase.symptoms}</span>
        </h3>
      </div>
      <div>
        <h3>
          TimeFrame : <span>{this.state.foundCase.timeframe}</span>
        </h3>
      </div>
      <div>
        <div style={{ border: "1px solid black" }}>
          <h2>Vital Signs</h2>
          <ul>
            <li>
              Systolic : <span>{this.state.foundCase.systolic}</span>
            </li>
            <li>
              Diastolic : <span>{this.state.foundCase.diastolic}</span>
            </li>
            <li>
              Oxygen : <span>{this.state.foundCase.oxygen}</span>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <h2>Rate Of Pain 1 - 10 : {this.state.foundCase.rateOfPain}</h2>
      </div>
      <div>
        <p>{this.state.foundCase.description}</p>
        <quote>{this.state.foundCase.authorName}</quote>
      </div>
      <div>
        <h2>Comments: </h2>
        <Link to={`/comments/${this.state.foundCase._id}`}> <ion-icon size="large" name="add-circle-outline"></ion-icon> </Link>
        <p>{this.state.foundCase.comments}</p>
      </div>
    </div>
      </React.Fragment>
      
    )
  }

  render() {

    return (
      <div>
        <Link to="/cases" className="btn btn-warning">
          All Cases
        </Link>
        {
          this.state.foundCase !== null && this.showDiv()
        }
      </div>
    )
    }
}

