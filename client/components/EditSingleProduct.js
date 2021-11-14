import React from "react";
import { connect } from "react-redux";
import { fetchProduct, editProduct } from "../store/singleProduct";
import { Link } from 'react-router-dom';

class EditProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      price: "",
      color: "",
      inventory_quantity: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.productId);
  }

  componentDidUpdate(prevProps) {
    const product = this.props.product;
    if (prevProps.product.id !== product.id) {
      this.setState({
        name: product.name || "",
        description: product.description || "",
        price: product.price || 1000,
        inventory_quantity: product.inventory_quantity || "",
        color: product.color || "",
      });
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.editProduct({ ...this.props.product, ...this.state });
  }

  render() {
    const product = this.props.product;
    const { name, description, price, color, inventory_quantity } = this.state;
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
          <h2>Edit {product.name}</h2>
          <form className="left" onSubmit={this.handleSubmit}>
            <label htmlFor="name" className="editFormLabel">
              Product Name
            </label>
            <input
              name="name"
              value={name}
              onChange={this.handleChange}
              className="editFormInput"
            />
            <label htmlFor="name" className="editFormLabel">
              Price
            </label>
            <input
              name="price"
              value={price}
              onChange={this.handleChange}
              className="editFormInput"
            />
            <label htmlFor="name" className="editFormLabel">
              Description
            </label>
            <textarea
              name="description"
              value={description}
              onChange={this.handleChange}
              className="editFormInput"
            />
            <label htmlFor="name" className="editFormLabel">
              Inventory Quantity
            </label>
            <input
              name="inventory_quantity"
              value={inventory_quantity}
              onChange={this.handleChange}
              className="editFormInput"
            />
            <label htmlFor="name" className="editFormLabel">
              Color
            </label>
            <input
              name="color"
              value={color}
              onChange={this.handleChange}
              className="editFormInput"
            />
            <button type="submit" className="editBtn">
              Save Edits
            </button>
            <Link to={`/products/${product.id}`}>
              <button type="button" className="editBtn">Cancel</button>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  product: state.singleProduct,
});

const mapDispatch = (dispatch, { history }) => ({
  fetchProduct: (id) => dispatch(fetchProduct(id)),
  editProduct: (product) => dispatch(editProduct(product, history)),
});

export default connect(mapState, mapDispatch)(EditProduct);
