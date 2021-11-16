import React from 'react';
import { connect } from 'react-redux';
import Header from './HomeComponents/Header';
import About from './HomeComponents/About';
import FeaturedProducts from './HomeComponents/FeaturedProducts';
/**
 * COMPONENT
 */
export const Home = (props) => {
  return (
    <div id="home">
      <Header first_name={props.first_name} />
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
    first_name: state.auth.first_name
  };
};

export default connect(mapState)(Home);
