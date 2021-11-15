import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <header id="header">
      <div className="heroText">
        Welcome home.
        <br />
        <Link to="/products">
          <center>
            <button>Shop All</button>
          </center>
        </Link>
      </div>
    </header>
  );
};

export default Header;
