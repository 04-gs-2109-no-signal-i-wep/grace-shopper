import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import AllProducts from "./components/AllProducts";
import SingleProduct from "./components/SingleProduct";
import EditProduct from "./components/EditSingleProduct";
import AddProduct from "./components/AddProduct";
import { me } from "./store";
import Checkout from "./components/CartComponents/CartComplete";
import UserData from './components/UserData';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    return (
      <Switch>
        <Route path="/home" component={Home} />
        <Route exact path="/" component={Home} />

        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />

        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />

        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />

        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/products/:productId" component={SingleProduct} />
        <Route exact path="/addproduct" component={AddProduct} />
        <Route exact path="/cart" component={Checkout} />
        <Route exact path="/cart/guest" component={Checkout} />
        <Route exact path="/products/:productId/edit" component={EditProduct} />
        <Route exact path="/users" component={UserData} />
        <Redirect to="/home" />
      </Switch>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.is_admin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
