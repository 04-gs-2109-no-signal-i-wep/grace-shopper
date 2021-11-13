import React from "react";
import "../components/SingleProduct.css";

export const SingleProduct = (props) => {
  render(
    <div className="singleView">
      <div className='adminBar'>
        <button className="adminButton">Edit</button>
        <button className="adminButton">Delete</button>
      </div>
      <right>
        <img src="" className="featuredProduct" />
      </right>
      <left>
        <h2></h2>
        <div className="description"></div>
        <button className="addToCart">Add To Cart</button>
        <div className="details"></div>
      </left>
      <button className='back'>Back to All Products</button>
    </div>
  );
};
