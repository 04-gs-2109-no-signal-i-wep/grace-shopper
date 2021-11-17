import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";
import { addProduct } from "../store/singleProduct";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import ProductCarousel from "./ProductCarousel";
import Container from "@mui/material/Container";
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CircularLoading from './CircularLoading';
export class AllProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }
  componentDidMount() {
    this.props.fetchProducts();
    this.setState({ loading: false });
  }

  render() {
    const { allProducts, addProduct, is_admin } = this.props;
    const { loading } = this.state;
    console.log('ARE WE LOADING?:', this.state);
    console.log('WHAT IS CIRCULAR LOADING?', CircularLoading())
    return (
      <>
      {loading ? CircularLoading() : (
        is_admin ? (
          <div className="adminBar">
            <h5>Admin Control</h5>
            <div className="adminBar">
              <Link to={"addproduct"}>
                <button className="adminButton">
                  <AddCircleIcon fontSize="12" /> Add a Product
                </button>
              </Link>
            </div>
          </div>
        ) : (
        <>
          <ProductCarousel />
          <Container maxWidth="md" className="product-container">
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
              direction="row"
            >
              {allProducts &&
                allProducts.map((product) => {
                  return (
                    <Grid item xs={8} md={4} key={product.id}>
                      <ProductCard
                        image={product.image_url}
                        title={product.name}
                        description={product.description}
                        productId={product.id}
                      />
                    </Grid>
                  );
                })}
            </Grid>
          </Container>
        </>
        )
        )}
      </>
    );
  }
}

const mapState = ({ products, auth }) => ({
  allProducts: products.allProducts,
  is_admin: auth.is_admin,
});

const mapDispatch = (dispatch) => ({
  fetchProducts: () => dispatch(fetchProducts()),
  addProduct: (product) => dispatch(addProduct(product)),
});

export default connect(mapState, mapDispatch)(AllProducts);
