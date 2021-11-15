import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFeaturedProducts } from '../../store/featuredProducts';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

class FeaturedProducts extends Component {
  constructor(props) {
    super(props);
    console.log('earliest props, ', this.props);
    this.switchToSingleCollection = this.switchToSingleCollection.bind(this);
  }

  componentDidMount() {
    this.props.fetchFeaturedProducts();
    console.log('earlier this: ', this.props);
  }

  switchToSingleCollection(id) {
    console.log('this is', this);
    this.props.history.push(`/products/${id}`);
  } //ideally when someone clicks on a featured collection it should take them to that collection/product's page ...

  render() {
    console.log(this.props.featuredProducts);
    return (
      <div className="featuredProducts">
        <div id="viewAll">
          <Link to="/products">
            <Button size="small" variant="outlined">
              View All Collections
            </Button>
          </Link>
        </div>
        <h3 id="featuredProductsHeader">Featured Collections:</h3>
        {this.props.featuredProducts.length === 0 ? (
          <p></p>
        ) : (
          <div className="featuredProductsContainer">
            {this.props.featuredProducts.map((product) => (
              <div className="featuredProductRow" key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <img
                    src={product.image_url}
                    style={{ width: '200px', height: '200px' }}
                    onClick={() => this.switchToSingleCollection(product.id)}
                  />
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
