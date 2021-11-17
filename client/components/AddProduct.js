import React from "react";
import { connect } from "react-redux";
import { addProduct } from '../store/singleProduct';
import { Link } from 'react-router-dom';
import Container from "@mui/material/Container";

export class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: 0,
      description: "",
      image_url: "",
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
    this.props.history.push('/products');
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

    const { handleSubmit, handleChange } = this;

    return (
      <Container maxWidth="sm" className="left">
          <h2>Add A Product</h2>
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
              <button type="button" className="editBtn">Cancel</button>
            </Link>
          </form>
      </Container>
    )
  }
}

const mapDispatch = (dispatch, history) => ({
  addProduct: (product) => dispatch(addProduct(product)),
});

export default connect(null, mapDispatch)(AddProduct);
