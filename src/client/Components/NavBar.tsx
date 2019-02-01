import React, { Component } from "react";

class NavBar extends Component {
  render() {
    return (
      <div className="navbar text-white">
        <button className="btn-secondary gene-btn">GeneTypes</button>
        <button className="btn-secondary morphs-btn">Morphs</button>
        <button className="btn-secondary basics-btn">Basics</button>
        <button className="home-btn">
          <img
            className="rounded navbar-icon"
            src="data:image/jpeg;base64,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"
            alt=""
          />
        </button>
      </div>
    );
  }
}

export default NavBar;
