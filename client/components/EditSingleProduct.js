import React from "react";

class EditProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      price: "",
    };
  }

  render() {
    return (
      <div className="singleView">
        <div className="right">
          <img
            src={product.image_url}
            className="featuredProduct"
            alt={product.name}
          />
        </div>
        <div className="left">
          <h2>{product.name}</h2>
          <div className="description">{product.description}</div>
          <div className="price">${product.price}</div>
          <button className="addToCart">Add To Cart</button>
          <div className="details"></div>
        </div>
      </div>
    );
  }
}
