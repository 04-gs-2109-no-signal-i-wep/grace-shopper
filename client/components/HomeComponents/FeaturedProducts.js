import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchFeaturedProducts } from "../../store/featuredProducts";
import { Link } from "react-router-dom";

class FeaturedProducts extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchFeaturedProducts();
  }

  render() {
    return (
      <center>
        <div className="featuredProducts">
          <h3>Featured Products</h3>
          {this.props.featuredProducts.length === 0 ? (
            <p></p>
          ) : (
            <div className="featuredProductsContainer">
              {this.props.featuredProducts.map((product) => (
                <div key={product.id} className="featuredBox">
                  <Link to={`/products/${product.id}`}>
                    <img src={product.image_url} className="featuredImg" />
                    <div className="featuredDesc">
                      <h4>{product.name}</h4>
                      <p>Starting at ${product.price}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
          <Link to="/products">
            <button>View All Products</button>
          </Link>
        </div>
      </center>
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
