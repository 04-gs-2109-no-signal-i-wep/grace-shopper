import React from 'react';
import { connect } from 'react-redux';
import { fetchFeaturedProducts } from '../store/featuredProducts';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';

class ProductCarousel extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchFeaturedProducts();
  }

  render() {
    const { featuredProducts } = this.props;
    return (
      <Carousel>
        {featuredProducts && featuredProducts.map((product) => {
          return (
            <div key={product.id}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <img className="all-prod-carousel-img" src={product.image_url} />
            </div>
          )
        })}
      </Carousel>
    )
  }
}

const mapState = (state) => ({
    featuredProducts: state.featuredProducts,
});

const mapDispatch = (dispatch) => ({
    fetchFeaturedProducts: () => dispatch(fetchFeaturedProducts())
});

export default connect(mapState, mapDispatch)(ProductCarousel);


