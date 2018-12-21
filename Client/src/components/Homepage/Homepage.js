import React, { Component } from "react";
import Service from "../MedicalApi/lexigram";
import "./Homepage.css";
import ComponentOne from "../images/icon_sets_100_popular_requests_fill_iconfinder-80-512.png";
import ComponentTwo from "../images/Stethoscope-512.png";
import ComponentThree from "../images/medicalLogo.png";

export default class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      queryResult: null
    };
    this.service = new Service();

    
  }
  handleFormSubmit = e => {
    e.preventDefault();

    const query = this.state;

    console.log(this.state);
    console.log(query);

    this.service
      .search({
        query
      })
      .then(resultPayload => {
        console.log(resultPayload);
        this.setState({
          query: "",
          queryResult: resultPayload
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

  queryResults = () => {
    return this.state.queryResult.map(label => {
      return (
 
          <li className="listItem"><strong>{label}</strong></li>

      );
    });
  };

  render() {
    return (
      <div>

        <div className="home-hero">
          <h1 className="title">[VITAL]ITY</h1>
          <h2 id="doctorQuote">From Doctors , For Doctors</h2>
          <div id="queryList">
          {this.state.queryResult !== null && this.queryResults()}
          </div>
        </div>
        <form onSubmit={this.handleFormSubmit}>
          <input
            id="search"
            type="text"
            name="query"
            placeholder="Quick Search.."
            onChange={e => this.handleChange(e)}
          />
          <input style={{"display": "none"}} type="submit" value="searchQuery" />
        </form>

        <section id="rows">
          <div className="row">
            <div className="col-md-4 ">
              <img class="componentImg" src={ComponentOne} />
              <h2>About Us</h2>
              <p>
                As Healthcare grows, Diseases grow simultaneously. Vitality
                specializes in common-to-rare cases with qualified opinions on
                cases which could save a life. Saving a life may just be{" "}
                <strong>One Click Away</strong>{" "}
              </p>
            </div>

            <div className="col-md-4 ">
              <img class="componentImg" src={ComponentTwo} />
              <h2>Cases</h2>
              <p>
                Our wide variety of cases range from simple to rare. Every
                person is different . Every Case is Unique{" "}
                
              </p>
            </div>

            <div className="col-md-4 ">
              <img class="componentImg" src={ComponentThree} />
              <h2>Community</h2>
              <p>
                Our community is made by <strong>Verified</strong> Physicians
                who are comitted to lending their knowledge and experience to
                save patients around the world.
              </p>
            </div>
          </div>
        </section>

          <hr id="hack"></hr>
          <div id="footer" className="row">
            <div id="hackTwo" className="col-md-6 rowComponent">
              <h5 id="contactUs">Contact Us</h5>
              <ul>
                <li>
                  <a className="hackThree" href="">Email Us</a>
                </li>
                <li>
                  <a className="hackThree" href="">Subscribe</a>
                </li>
                <li>
                  <a className="hackThree"  href="">Support</a>
                </li>
                <li>
                  <a className="hackThree" href="">Meet The Team</a>
                </li>
              </ul>
            </div>

            <div className="col-md-6 rowComponent">
              <h5>Follow Us</h5>
              <ion-icon className="icons" size="large" name="logo-instagram" />
              <ion-icon className="icons" size="large" name="logo-facebook" />
              <ion-icon className="icons" size="large" name="logo-linkedin" />
              <ion-icon className="icons" size="large" name="logo-github" />
            </div>

            {/* <div className="col-md-3 rowComponent">

              <h2>Community</h2>
              <p>
                Our community is made by <strong>Verified</strong> Physicians
                who are comitted to lending their knowledge and experience to
                save patients around the world.
              </p>
            </div>
            <div className="col-md-3 rowComponent">

              <h2>Community</h2>
              <p>
                Our community is made by <strong>Verified</strong> Physicians
                who are comitted to lending their knowledge and experience to
                save patients around the world.
              </p>
            </div> */}
          </div>

      </div>
    );
  }
}
