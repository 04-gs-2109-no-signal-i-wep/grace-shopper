import React from "react";
import { Link } from 'react-router-dom';

const About = (props) => {
  return (
    <div id="about">
      <div className="about-text">
        Our design team spent years creating the perfect room for you: now all
        you need to do is get it shipped. Our collections come as whole packages
        - tables, chairs and couches. Because home should be easy.{" "}
        <Link to="/products">
          <center><button>View All Products</button></center>
        </Link>
      </div>
    </div>
  );
};

export default About;
