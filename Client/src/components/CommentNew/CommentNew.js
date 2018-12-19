import React, { Component } from "react";
import commentService from './CommentService';
import { Redirect } from "react-router-dom";
import axios from "axios"

export default class CommentNew extends Component {
  constructor(props) {
    super(props)
    console.log(this.props);
    this.state = {
      title:"",
      text:"",
      caseId:  this.props.match.params.id
    };
    console.log(this.props.match.params.id);

    this.commentService = new commentService();
  }

  // componentDidMount() {
  //   console.log(this.props.match.params.id);
  //   axios
  //     .create(`${process.env.REACT_APP_API_URL}/comments/${
  //         this.props.match.params.id
  //       }`{
  //       withCredentials: true
  //     })
  //     .then(responseFromAPI => {
  //       console.log("entramosss")
  //       console.log(this.state)
  //       this.setState({
  //         ...this.state,
  //         foundCase: responseFromAPI.data.foundCase
  //       });
  //       console.log("Response from API is: ", responseFromAPI.data);
  //     })
  //     .catch(err => {
  //       console.log("Error is: ", err);
  //     });
  // }
  handleFormSubmit = e => {
    e.preventDefault();

    const {
      title,
      text,
      caseId

    } = this.state;
    
    console.log(this.state);

    this.commentService
      .createComment({
        title,
        text,
        caseId
      })
      .then(comment => {
        this.setState({
          title: "",
          text: "",
          caseId:""
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
    }

    return (
      <div>
       
        <div className="row justify-content-md-center text-center">
          <div className="col-md-4">
        <form onSubmit={this.handleFormSubmit}>
        <h2>Whats Your Intake? </h2>
        <label htmlFor="title">Title : </label>
                <input
                  autoComplete="off"
                  className="form-control"
                  id="title"
                  name="title"
                  onChange={e => this.handleChange(e)}
                  type="text"
                />
                
                <label htmlFor="text">Comment: </label>
                <input
                  autoComplete="off"
                  className="form-control"
                  id="text"
                  name="text"
                  onChange={e => this.handleChange(e)}
                  type="text"
                />
   
                <br></br>
          
          <input type="submit" value="CommentNew" />
        </form>
        </div>
        </div>
      </div>
    );
  }
}

