import React from "react";
import { connect } from "react-redux";
import { fetchProduct } from "../store/singleProduct";
import {} from "../store/auth";

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.productId);
  }

  render() {
    console.log(this.props);
    console.log(this.props.is_admin);
    const product = this.props.product;

    return (
      <>
        {product ? (
          <>
            <div className="singleView">
              {this.props.is_admin ? (
                <div className="adminBar">
                  <button className="adminButton">Edit</button>
                  <button className="adminButton">Delete</button>
                </div>
              ) : (
                ""
              )}
              <main className="right">
                {/* <img src="{product.image_url}" className="featuredProduct" /> */}
              </main>
              <main className="left">
                <h2>{product.name}</h2>
                <div className="description">{product.description}</div>
                <div className="price">${product.price}</div>
                <button className="addToCart">Add To Cart</button>
                <div className="details"></div>
              </main>
            </div>
            <button className="back">Back to All Products</button>
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
