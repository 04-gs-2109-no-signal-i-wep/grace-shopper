import React from "react";
import { connect } from "react-redux";
import { addProduct } from '../store/singleProduct';
import { Link } from 'react-router-dom';

export class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: "",
      description: "",
      image_url: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1287&q=80',
      featured: false,
      color: "",
      size: "",
      inventory_quantity: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addProduct({ ...this.state });
    console.log('HERE IS STATE IN HANDLE SUBMIT!!!', this.state)
  }

  render() {
    const { 
    name, 
    price, 
    description, 
    image_url,
    featured,
    color,
    size,
    inventory_quantity
    } = this.state;

    console.log('HERE IS STATE!!!', this.state)

    const { handleSubmit, handleChange } = this;

    return (
      <div className="left">
        <h2>Add a Product</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className="add-prod-form-label">
            Product Name
          </label>
          <input
            name="name"
            value={name}
            onChange={handleChange}
            className="add-prod-form-input"
          />
          <label htmlFor="name" className="add-prod-form-label">
            Price
          </label>
          <input
            name="price"
            value={price}
            onChange={handleChange}
            className="add-prod-form-input"
          />
          <label htmlFor="name" className="add-prod-form-label">
            Description
          </label>
          <textarea
            name="description"
            value={description}
            onChange={handleChange}
            className="add-prod-form-input"
          />
          <label htmlFor="image-url" className="add-prod-form-label">
            Image Url
          </label>
          <input
            name="image-url"
            value={image_url}
            onChange={handleChange}
            className="add-prod-form-input"
          />
          <label htmlFor="image-url" className="add-prod-form-label">
            Featured
          </label>
          <input
            name="featured"
            value={featured}
            onChange={handleChange}
            className="add-prod-form-input"
          />
          <label htmlFor="name" className="add-prod-form-label">
            Color
          </label>
          <input
            name="color"
            value={color}
            onChange={handleChange}
            className="add-prod-form-input"
          />
          <label htmlFor="name" className="add-prod-form-label">
            Size
          </label>
          <input
            name="size"
            value={size}
            onChange={handleChange}
            className="add-prod-form-input"
          />
          <label htmlFor="name" className="add-prod-form-label">
            Inventory Quantity
          </label>
          <input
            name="inventory_quantity"
            value={inventory_quantity}
            onChange={handleChange}
            className="add-prod-form-input"
          />
          <button type="submit">
            Add Product
          </button>
          <Link to={'/products'}>
            <button type="button">Cancel</button>
          </Link>
        </form>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => ({
  addProduct: (product) => dispatch(addProduct(product)),
});

export default connect(null, mapDispatch)(AddProduct);