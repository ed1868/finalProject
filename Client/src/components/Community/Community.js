import React, { Component } from 'react'
import {Link} from 'react-router-dom'



export default class Community extends Component {
  render() {
    return (
      <div>
        <div className="home-hero">
          <h1>All The Messages will go here</h1>
          <h2>If You are a user You will be able to add a status or message</h2>
          <Link to="/" className="btn btn-primary">Go Home</Link>
        </div>
        
      </div>
    )
  }
}
