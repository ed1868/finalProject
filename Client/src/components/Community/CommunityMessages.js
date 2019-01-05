import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserAside from "./UserAside";
import Moment from "react-moment";
import "./community.css";

const messagesApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/community`
});

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      messages: null,
      loggedInUser: this.props["userInSession"]
    };
  }

  componentDidMount() {
    messagesApi
      .get()
      .then(responseFromAPI => {
        this.setState({
          ...this.state,
          messages: responseFromAPI.data.messages
        });
        console.log("Response from API is: ", responseFromAPI.data);
      })
      .catch(err => {
        console.log("Error is: ", err);
      });
  }

  willReceiveProps(props) {
    this.setState({ ...this.state, loggedInUser: this.props["userInSession"] });
  }

  showDeleteButton = () => {
    console.log(this.props.userInSession.username);
    this.state.messages.map(message => {
      console.log("hello----", message.user.username);
      if (this.props.userInSession.username == message.user.username) {
        console.log("match");
        return(
 
          <button className="btn btn-danger">Delete</button>

        )
      }
    });
  };
  
  showAddButton = () =>{
    if(this.props.userInSession){
      return <ion-icon size="large" name="add-circle-outline" />
    }
  }
  render() {
    console.log(this.props.userInSession);
    return (
      <div>
        <h2 id="tweetHeader">
          <ion-icon id="pulseStart" name="pulse" /> Our Pulse
          <ion-icon id="pulseEnd" name="pulse" />{" "}
        </h2>
        <br />
        <Link to="/community/messages/new">
          {this.showAddButton()}
        </Link>
        <br />

        {this.state.messages !== null &&
          this.state.messages.map(messages => {
            let username = messages.user ? messages.user.username : "unknown";
            let url = messages.user ? messages.user.url : "unknown";
            return (
              <div>
                <br />
                <div className="row">
                  <div className="col-md-6">
                    <div>
                      <div className="message-area">
                        <div>
                          <img id="tweetPic" src={url} />
                        </div>
                        <Link to="/">
                          <ion-icon size="large" name="finger-print" /> @
                          {username} &nbsp;
                        </Link>

                        <br />
                        <br />
                        {/* <Link to="/"><button className="btn btn-danger">Delete</button></Link> */}
                        <br />
                        <span className="text-muted">
                          <Moment className="text-muted" format="Do MMM YYYY">
                            {messages.createdAt}
                          </Moment>
                        </span>
                      </div>
                      {/* <div>{this.showDeleteButton()}</div> */}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h4 id="tweetMessage">{messages.title}</h4>
                    <p>
                      <span id="tweetText">{messages.text} </span>
                    </p>
                  </div>
                </div>
                <hr id="tweetLine" />
              </div>
            );
          })}
      </div>
    );
  }
}
