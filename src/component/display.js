import React from "react";

function Display({ imgSrc, html_url, username }) {
  return (
    <div className="display-one">
      <img src={imgSrc} alt="profile img" />
      <a href={html_url} className="text-style1">
        {username}
      </a>
    </div>
  );
}

export default Display;
