import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";
import ProductCard from "./ProductCard";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    const { allProducts } = this.props;
    return (
      <Container maxWidth="md" className="product-container">
          <Grid container spacing={2} justifyContent="center" alignItems="center" direction="row">
            {allProducts &&
              allProducts.map((product) => {
                return (
                  <Grid item xs={8} md={4} key={product.id}>
                    <ProductCard
                      image={product.image_url}
                      title={product.name}
                      description={product.description}
                    />
                  </Grid>
                );
              })}
          </Grid>
      </Container>
    );
  }
}

const mapState = ({ products }) => ({
  allProducts: products.allProducts,
});

const mapDispatch = (dispatch) => ({
  fetchProducts: () => dispatch(fetchProducts()),
});

export default connect(mapState, mapDispatch)(AllProducts);
