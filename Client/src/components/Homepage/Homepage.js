import React, { Component } from "react";
import "./Homepage.css";
import ComponentOne from "../images/icon_sets_100_popular_requests_fill_iconfinder-80-512.png";
import ComponentTwo from "../images/Stethoscope-512.png";
import ComponentThree from "../images/medicalLogo.png";

export default class Homepage extends Component {
  render() {
    return (
      <div>
        <div className="home-hero">
          <h1 className="title">[VITAL]ITY</h1>
          <h2>From Doctors , For Doctors</h2>
        </div>

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
                <ion-icon size="medium" name="pulse"></ion-icon>
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

        <section id="footer">
          <div className="row">
            <div className="col-md-6 rowComponent">
              <h5>Contact Us</h5>
              <ul>
                <li><a href="">Email Us</a></li>
                <li><a href="">Subscribe To Mailing List</a></li>
                <li><a href="">Support</a></li>
                <li><a href="">Meet The Team</a></li>
              </ul>
            </div>

            <div className="col-md-6 rowComponent">

            <h5>Follow Us</h5>
            <ion-icon size="large" name="logo-instagram"></ion-icon>
            <ion-icon size="large" name="logo-facebook"></ion-icon>
            <ion-icon size="large" name="logo-linkedin"></ion-icon>
            <ion-icon size="large" name="logo-github"></ion-icon>
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
        </section>
      </div>
    );
  }
}
