import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchFeaturedProducts } from "../../store/featuredProducts";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

class FeaturedProducts extends Component {
  constructor(props) {
    super(props);
    console.log("earliest props, ", this.props);
    this.switchToSingleCollection = this.switchToSingleCollection.bind(this);
  }

  componentDidMount() {
    this.props.fetchFeaturedProducts();
    console.log("earlier this: ", this.props);
  }

  switchToSingleCollection(id) {
    console.log("this is", this);
    this.props.history.push(`/products/${id}`);
  } //ideally when someone clicks on a featured collection it should take them to that collection/product's page ...

  render() {
    console.log(this.props.featuredProducts);
    return (
      <div className="featuredProducts">
        <h3>Featured Products</h3>
        {this.props.featuredProducts.length === 0 ? (
          <p></p>
        ) : (
          <div className="featuredProductsContainer">
            {this.props.featuredProducts.map((product) => (
              <div key={product.id} className="featuredBox">
                <Link to={`/products/${product.id}`}>
                  <img
                    src={product.image_url}
                    style={{ width: "300px", height: "300px" }}
                    onClick={() => this.switchToSingleCollection(product.id)}
                    className="featuredImg"
                  />
                  <div className="featuredDesc">
                    <h4>{product.name}</h4>
                    <p>Starting at ${product.price}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

const mapState = (state) => ({
  featuredProducts: state.featuredProducts,
});

const mapDispatch = (dispatch) => ({
  fetchFeaturedProducts: () => dispatch(fetchFeaturedProducts()),
});

export default connect(mapState, mapDispatch)(FeaturedProducts);
