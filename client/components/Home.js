import React from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import Header from './HomeComponents/Header';
import About from './HomeComponents/About';
import FeaturedProducts from './HomeComponents/FeaturedProducts';
/**
 * COMPONENT
 */
export const Home = (props) => {
  console.log(props);

  return (
    <div id="home">
      <Header />
      <About />
      <FeaturedProducts />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    first_name: state.auth.first_name,
  };
};

export default connect(mapState)(Home);
