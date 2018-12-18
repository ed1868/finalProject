import React, { Component } from "react";
import messageService from './MessageService'
import { Redirect } from "react-router-dom";

export default class AddMessage extends Component {
  constructor(props) {
    super(props);
    this.props=props;
    
    this.state = {
      title:"",
      text:"",
    };

    this.messageService = new messageService();
  }

  handleFormSubmit = e => {
    e.preventDefault();

    const {
      title,
      text,
    } = this.state;
    
    console.log(this.state);

    this.messageService
      .createMessage({
        title,
        text,
      })
      .then(message => {
        this.setState({
          title: "",
          text: "",
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
        <h2>Add A Status</h2>
        <label htmlFor="title">Title : </label>
                <input
                  autoComplete="off"
                  className="form-control"
                  id="title"
                  name="title"
                  onChange={e => this.handleChange(e)}
                  type="text"
                />
                
                <label htmlFor="text">Text : </label>
                <input
                  autoComplete="off"
                  className="form-control"
                  id="text"
                  name="text"
                  onChange={e => this.handleChange(e)}
                  type="text"
                />
   
                <br></br>
          
          <input type="submit" value="AddMessage" />
        </form>
        </div>
        </div>
      </div>
    );
  }
}

