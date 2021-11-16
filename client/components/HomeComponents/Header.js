import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
  const name = props.first_name;
  return (
    <header id="header">
      <div className="heroText">
        {name ? <h2>Welcome home, {name}</h2> : <h2>Welcome home.</h2>}
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
