import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { fetchProduct } from "../../store/singleProduct";
import { connect } from "react-redux";

class GuestCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
    this.setCartToState = this.setCartToState.bind(this);
  }

  async componentDidMount() {
    const cart = JSON.parse(window.localStorage.cart);
    try {
      this.setCartToState(cart);
    } catch (error) {
      console.error(error);
    }
  }

  async setCartToState(cart) {
    this.setState({
      products: cart,
    });
  }

  render() {
    if (!window.localStorage.cart) {
      window.localStorage.cart = JSON.stringify([]);
    }
    let guestCart = JSON.parse(window.localStorage.cart);
    const productsInCart = this.state.products;
    // const total = productsInCart.reduce((acc, product) => {
    //   acc += product.price * product.quantity;
    //   return acc;
    // }, 0);

    console.log("are you in guest cart?", guestCart);

    return (
      <div className="cartReviewDiv">
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Order summary
          </Typography>
          <List disablePadding>
            {guestCart.map((product) => (
              <ListItem key={product.productId} sx={{ py: 1, px: 0 }}>
                <ListItemText
                  primary={product.name}
                  secondary={
                    <ButtonGroup
                      size="small"
                      aria-label="small outlined button group"
                    >
                      <Button
                        onClick={() =>
                          this.handleIncrement(
                            product.orderId,
                            product.productId,
                            product.quantity
                          )
                        }
                      >
                        +
                      </Button>
                      {<Button disabled>{product.quantity}</Button>}
                      {
                        <Button
                          onClick={() =>
                            this.handleDecrement(
                              product.orderId,
                              product.productId,
                              product.quantity
                            )
                          }
                        >
                          -
                        </Button>
                      }
                      <Button
                        onClick={() => {
                          guestCart = guestCart.filter((cartItem) => {
                            return +cartItem.productId !== product.productId;
                          });
                          guestCart = JSON.stringify(guestCart);
                          this.setCartToState(guestCart);
                        }}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  }
                />
                <Typography variant="body2">${product.price}</Typography>
              </ListItem>
            ))}

            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Total" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {/* ${total.toFixed(2)} */}
              </Typography>
            </ListItem>
          </List>
        </React.Fragment>
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   fetchProduct: (productId) => dispatch(fetchProduct(productId)),
// });

// export default connect(null, mapDispatchToProps)(GuestCart);

export default GuestCart;
