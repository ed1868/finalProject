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
      loggedInUser: this.props["userInSession"],
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

  showDeleteButton = () =>{
    return this.state.messages.map(message => {
      console.log(this.props.userInSession.username)
      console.log("hello----", message.user.username);

      if (this.props.userInSession.username !== message.user.username){
        return console.log("The User Signed in right now does not have access to another status delete button "); 
      }
      
      if(this.props.userInSession.username == message.user.username){
        return (
          <div>
            <button className="btn btn-danger">Delete</button>
            <hr></hr>
          </div>
    
        )
      }
   })
 }
  render() {
        console.log(this.props.userInSession);
    return (
      <div>
        <h2 id="tweetHeader"><ion-icon id="pulseStart" name="pulse"></ion-icon> Our Pulse<ion-icon id="pulseEnd" name="pulse"></ion-icon> </h2>
        <br></br>
        <Link to="/community/messages/new" >
        <ion-icon size="large" name="add-circle-outline"></ion-icon>
        </Link>
        <br></br>
        {/* <UserAside getUser={this.getUser}/> */}

        {this.state.messages !== null &&
          this.state.messages.map(messages => {
            let username = messages.user ? messages.user.username : "unknown";
            let url = messages.user ? messages.user.url : "unknown";
            return (
              <div>
                <br></br>
                <div className="row">
                  <div className="col-md-6">
                    <div >
                      <div  className="message-area">
                        <div>
                          <img id="tweetPic" src={url} />
                        </div>
                        <Link to="/">
                          <ion-icon size="large" name="finger-print" /> @
                          {username} &nbsp;
                        </Link>
         
                        <br></br>
                        <br></br>
                        {/* <Link to="/"><button className="btn btn-danger">Delete</button></Link> */}
                        <br></br>
                        <span className="text-muted">
                          <Moment className="text-muted" format="Do MMM YYYY">
                            {messages.createdAt}
                          </Moment>
                        </span>
                      </div>
                      <div>{this.showDeleteButton()}</div>
                    </div>


                  </div>
                  <div className="col-md-6">
                    <h4 id="tweetMessage">{messages.title}</h4>
                        <p>
                           <span id="tweetText">{messages.text} </span>
                        </p>
                    </div>
                </div>
                <hr id="tweetLine"></hr>
              </div>
            );
          })}
      </div>
    );
  }
}
