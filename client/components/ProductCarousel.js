import React from "react";
import { connect } from "react-redux";
import { fetchFeaturedProducts } from "../store/featuredProducts";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";
import { Paper } from "@mui/material";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5b7b7a",
    },
  },
});
class ProductCarousel extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchFeaturedProducts();
  }

  render() {
    const { featuredProducts } = this.props;
    return (
      <Carousel>
        {featuredProducts &&
          featuredProducts.map((product) => {
            return (
              <div key={product.id}>
                <img
                  className="all-prod-carousel-img"
                  src={product.image_url}
                />
                <div className="all-prod-carousel-txt">
                  <h1>{product.name}</h1>
                  <Link to={`/products/${product.id}`}>
                    <ThemeProvider theme={theme}>
                      <Button sx={{ mt: 2 }} size="medium" variant="contained" color="primary">
                        Shop Now
                      </Button>
                    </ThemeProvider>
                  </Link>
                </div>
              </div>
            );
          })}
      </Carousel>
    );
  }
}

const mapState = (state) => ({
  featuredProducts: state.featuredProducts,
});

const mapDispatch = (dispatch) => ({
  fetchFeaturedProducts: () => dispatch(fetchFeaturedProducts()),
});

export default connect(mapState, mapDispatch)(ProductCarousel);
