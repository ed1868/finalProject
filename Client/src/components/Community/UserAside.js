import React from "react";
import DefaultProfileImg from "../images/Medical-Logo.png";

const UserAside = ({ url, username }) => (
  <div className="row">
  <aside className="col-sm-2">
    <div className="panel panel-default">
      <div className="panel-body">
  
        <p>Username : {username}</p>
        <img
          src={url || DefaultProfileImg}
          alt={username}
          width="200"
          height="200"
          className="img-thumbnail"
        />

      </div>
    </div>
  </aside>
  </div>
);

export default UserAside;

