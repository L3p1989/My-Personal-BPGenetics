import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <>
        <div className="bw-gradient" />
        <Link className="link" to="/">
          <img
            className="logo"
            src="https://cdn.discordapp.com/attachments/501423134335828000/545826863130345502/1080_namira.png"
            alt=""
          />
          Home
        </Link>
        <div className="navbar">
          <div className="header">
            <nav>
              <ul>
                <li>
                  <a>
                    <Link to="/genetypes" className="link">
                      GeneTypes
                    </Link>
                  </a>
                </li>
                <li>
                  <a>
                    <Link to="/basicgenes" className="link">
                      Basics
                    </Link>
                  </a>
                </li>
                <li>
                  <a>
                    <Link to="/morphs" className="link">
                      Morphs
                    </Link>
                  </a>
                </li>
              </ul>
            </nav>
            <button className="login-btn">Log In</button>
            <button className="account-btn">Create Account</button>
          </div>
          <h1 className="brand-quote">Ball Python Genetics</h1>
        </div>
      </>
    );
  }
}

export default NavBar;
