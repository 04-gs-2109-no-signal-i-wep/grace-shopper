import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { fetchProduct } from "../store/singleProduct";

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.productId);
  }

  render() {
    const product = this.props.product;
    return (
      <>
        {product ? (
          <>
            <main>
              {this.props.is_admin ? (
                <div className="adminBar">
                  <h5>Admin Control</h5>
                  <button className="adminButton"><a href={`/products/${product.id}/edit`}>Edit</a></button>
                  <button className="adminButton">Delete</button>
                </div>
              ) : (
                ""
              )}
              <div className="singleView">
                <div className="right">
                  <img src={product.image_url} className="featuredProduct" alt={product.name} />
                </div>
                <div className="left">
                  <h2>{product.name}</h2>
                  <div className="description">{product.description}</div>
                  <div className="price">${product.price}</div>
                  <button className="addToCart">Add To Cart</button>
                  <div className="details"></div>
                </div>
              </div>
            </main>
            <center><Link to={'/products'}><button className="back">Back to All</button></Link></center>
          </>
        ) : (
          "Still Loading..."
        )}
      </>
    );
  }
}

const mapState = (state) => ({
  product: state.singleProduct,
  is_admin: state.auth.is_admin,
});

const mapDispatch = (dispatch, history) => ({
  fetchProduct: (id) => dispatch(fetchProduct(id)),
  deleteProduct: (id) => dispatch(deleteProduct(id, history)),
});

export default connect(mapState, mapDispatch)(SingleProduct);
