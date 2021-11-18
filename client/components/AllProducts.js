import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";
import { addProduct } from "../store/singleProduct";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import ProductCarousel from "./ProductCarousel";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Pagination, Typography, Stack  } from "@mui/material";
import CircularLoading from './CircularLoading';

export class AllProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      loading: true
    };
  }

  componentDidMount() {
    this.setLoading();
  }

  async setLoading() {
    try {
      await this.props.fetchProducts();
      this.setState({
        loading: false,
      })
    } catch (error) {
      console.error(error)
    }
  }

  fetchPageProducts() {
    //pagination
    const numberPerPage = 9;
    const trimStart = (this.state.page-1)*numberPerPage;
    const trimEnd = trimStart + numberPerPage;
    const pageProducts = this.props.allProducts.slice(trimStart, trimEnd);
    console.log(this.page, trimStart, trimEnd, pageProducts)
    return pageProducts;
  }

  render() {
    const { allProducts, addProduct, is_admin } = this.props;
    const { loading } = this.state;

    const handleChange = (event, value) => {
      this.setState({page: value});
    };

    const pageProducts = this.fetchPageProducts();
    const numPages = Math.ceil(allProducts.length/9);
    console.log('ASDFASDFSDF' + numPages);
    
    return (
      <>
        { loading ? CircularLoading() : (
          <>
          {is_admin ? (
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
          ) : null 
          }
            <ProductCarousel />
          <Container maxWidth="md" className="product-container">
            <div className="all-prod-body">
              <h3>All Collections</h3>
            </div>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
              direction="row"
            >
              {pageProducts &&
                pageProducts.map((product) => {
                  return (
                    <Grid item xs={8} md={4} key={product.id}>
                      <ProductCard
                        image={product.image_url}
                        title={product.name}
                        description={product.description}
                        productId={product.id}
                        isAdmin={is_admin}
                        inventoryQuantity={product.inventory_quantity}
                      />
                    </Grid>
                  );
                })}
            </Grid>
            {/* //Pagination */}
            <Stack spacing={2}>
              <Typography>Page: {this.state.page} </Typography>
              <Pagination count={numPages} page={this.state.page} onChange={handleChange} />
            </Stack>
          </Container>
          </>
          )
        }
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