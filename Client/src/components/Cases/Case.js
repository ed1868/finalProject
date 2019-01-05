import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Case.css";

export default class Case extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      foundCase: null,
      caseId: this.props.match.params.id
    };
  }

  componentDidMount() {
    console.log(this.props.match.params.id);
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/cases/${this.props.match.params.id}`,
        {
          withCredentials: true
        }
      )
      .then(responseFromAPI => {
        console.log("entroooo");
        console.log(this.state);
        this.setState({
          ...this.state,
          foundCase: responseFromAPI.data.foundCase
        });
        let title = responseFromAPI.data.foundCase;
        console.log(title);
        console.log("Response from API is: ", responseFromAPI.data);
      })
      .catch(err => {
        console.log("Error is: ", err);
      });
  }

  showComments = () => {
    console.log("AUTHOR----------", this.state.foundCase.authorName);
    return this.state.foundCase.comments.map(comments => {
      return (
        <div>
          <h4>{comments.title}</h4>
          <p>{comments.text}</p>
          <blockquote id="tweetComment">@{comments.authorUsername}</blockquote>
          <button className="btn btn-danger">Delete</button>
          <hr />
        </div>
      );
    });
  };

  showAddButton = () => {
    if (this.props.userInSession) {
      return <ion-icon size="large" name="add-circle-outline" />;
    }
  };

  showDeleteButton = e => {
    if (this.props.userInSession.username == e) {
      return (
        <Link to="/cases" id="deleteCase" className="btn btn-danger">
          Delete
        </Link>
      );
    }
  };

  showDiv = () => {
    return (
      <React.Fragment>
        <div>
          <div />
          <div>{this.showDeleteButton(this.state.foundCase.authorName)}</div>
          <div className="blue">
            <br />
            <h1>{this.state.foundCase.title}</h1> by{" "}
            <quote id="tweet">@ {this.state.foundCase.authorName}</quote>
            <h2 id="shape">
              <strong>Urgency Level :</strong>{" "}
              <span>{this.state.foundCase.urgencyLevel}</span>
            </h2>
            <h4 id="symptoms">
              Symptoms : <span>{this.state.foundCase.symptoms}</span>
            </h4>
            <h4 id="timeframe">
              TimeFrame : <span>{this.state.foundCase.timeframe}</span>
            </h4>
            <h4 id="pain">
              Rate Of Pain 1 - 10 : {this.state.foundCase.rateOfPain}
            </h4>
          </div>
          <hr />
          <div className="red">
            <img className="thumbnail" src={this.state.foundCase.url} />
          </div>

          <div className="yellow">
            <div>
              <h3>Vital Signs</h3>
              <ul id="list">
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

          <div className="description">
            <p>
              <strong>{this.state.foundCase.description}</strong>
            </p>
          </div>
          <br />
          <div className="comments">
            <h2>Comments: </h2>
            <Link to={`/comments/${this.state.foundCase._id}`}>
              {" "}
              {this.showAddButton()}{" "}
            </Link>
            <hr />
            <p>{this.showComments()}</p>
          </div>
        </div>
      </React.Fragment>
    );
  };

  render() {
    console.log("USERR----", this.props.userInSession);
    return (
      <div>
        <div>
          {/* <Link to="/cases" id="allCases" className="btn btn-primary">
          All Cases
        </Link>
     */}
        </div>
        {this.state.foundCase !== null && this.showDiv()}
      </div>
    );
  }
}
