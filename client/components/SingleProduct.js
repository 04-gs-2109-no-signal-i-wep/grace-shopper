import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProduct, deleteProduct } from '../store/singleProduct';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { addItemToCart } from '../store/cart';
import CircularLoading from './CircularLoading';
class SingleProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
    this.addToCart = this.addToCart.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.setLoading();
  }

  async setLoading() {
    try {
      console.log('SET LOADING RUNNING')
      await this.props.fetchProduct(this.props.match.params.productId);
      this.setState({
        loading: false,
      })
    } catch (error) {
      console.error(error)
    }
  }  

  addToCart(productId) {
    const user = this.props.user;
    if (user.id) {
      // handles logged in status & id
      this.props.addItemToCart(user.id, productId, this.state.quantity);
    }
  }

  handleDelete() {
    this.props.deleteProduct(this.props.product.id);
  }

  render() {
    const product = this.props.product;
    
    return (
      <>
        { this.state.loading ? CircularLoading() : (
          <>
        {/* {product ? (
          <> */}
            <main>
              {this.props.is_admin ? (
                <div className="adminBar">
                  <h5>Admin Control</h5>
                  <div className="adminBar">
                    <a href={`/products/${product.id}/edit`}>
                      <button className="adminButton">
                        <EditIcon fontSize="12" /> Edit
                      </button>
                    </a>
                    <button
                      className="adminButton"
                      onClick={() => this.props.deleteProduct(product.id)}
                    >
                      <DeleteIcon fontSize="12" /> Delete
                    </button>
                  </div>
                </div>
              ) : 
                null
              }
              <div className="singleView">
                <div>
                  <div className="back">
                    <Link to={'/products'}>
                      <ArrowBackIcon fontSize="12" /> Back to All
                    </Link>
                  </div>
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
                  <button
                    onClick={() => {
                      return this.addToCart(product.id);
                    }}
                  >
                    <ShoppingCartIcon fontSize="25" /> Add To Cart
                  </button>
                  <div className="details"></div>
                </div>
              </div>
            </main>
          </>
        // ) : (
        //   'Loading products...'
        // )}
          )
        }
      </>
    );
  }
}

const mapState = (state) => ({
  product: state.singleProduct,
  is_admin: state.auth.is_admin,
  user: state.auth,
});

const mapDispatch = (dispatch, { history }) => ({
  fetchProduct: (id) => dispatch(fetchProduct(id)),
  deleteProduct: (id) => dispatch(deleteProduct(id, history)),
  addItemToCart: (userId, productId, quantity) =>
    dispatch(addItemToCart(userId, productId, quantity)),
});

export default connect(mapState, mapDispatch)(SingleProduct);
