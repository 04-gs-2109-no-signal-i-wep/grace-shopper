import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { FormControl, InputLabel, NativeSelect } from '@mui/material';
import { fetchItemsInCart } from '../../store/cart';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    // this.handleIncrement = this.handleIncrement.bind(this);
    // this.handleDecrement = this.handleDecrement.bind(this);
  }

  componentDidMount() {
    this.props.fetchItemsInCart(this.props.auth.id);
    this.setState({
      loading: false,
    });
  }

  componentWillUnmount() {
    this.setState({
      loading: true,
    });
  }

  handleIncrement(name, quantity, id) {
    let newQuantity = quantity + 1;
    // this.setState({
    //   [name]: { quantity: newQuantity, id },
    // });
  }

  handleDecrement(name, quantity, id) {
    let newQuantity = quantity - 1;
    // this.setState({
    //   [name]: { quantity: newQuantity, id },
    // });
  }

  render() {
    const { cart } = this.props;

    return (
      <div className="loadingDiv">
        {' '}
        {this.loading ? (
          <p>loading</p>
        ) : (
          <div className="cartReviewDiv">
            {cart.length === 0 ? (
              <Typography variant="h6" gutterBottom>
                <Link to="/products">
                  Your cart is empty. Check out our Products page to find your
                  perfect room!
                </Link>
              </Typography>
            ) : (
              <React.Fragment>
                <Typography variant="h6" gutterBottom>
                  Order summary
                </Typography>
                <List disablePadding>
                  {cart[0].order_details.map((orderRow, index) => (
                    <ListItem
                      key={orderRow.orderId + orderRow.productId}
                      sx={{ py: 1, px: 0 }}
                    >
                      <ListItemText
                        primary={cart[0].products[index].name}
                        secondary={
                          <ButtonGroup
                            size="small"
                            aria-label="small outlined button group"
                          >
                            <Button
                              onClick={this.handleIncrement(
                                cart[0].products[index].name,
                                orderRow.quantity,
                                orderRow.orderId + orderRow.productId
                              )}
                            >
                              +
                            </Button>
                            {<Button disabled>{orderRow.quantity}</Button>}
                            {
                              <Button
                                onClick={this.handleDecrement(
                                  cart[0].products[index].name,
                                  orderRow.quantity,
                                  orderRow.orderId + orderRow.productId
                                )}
                              >
                                -
                              </Button>
                            }
                          </ButtonGroup>
                        }
                      />
                      <Typography variant="body2">
                        ${orderRow.total_price}
                      </Typography>
                    </ListItem>
                  ))}

                  <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      {cart[0].order_total}
                    </Typography>
                  </ListItem>
                </List>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                      Shipping
                    </Typography>
                    <Typography gutterBottom>
                      {this.props.auth.last_name}, {this.props.auth.first_name}
                    </Typography>
                    {/* <Typography gutterBottom>{addresses.join(', ')}</Typography> */}
                  </Grid>
                  <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                      Payment details
                    </Typography>
                    {/* <Grid container>
                  {payments.map((payment) => (
                    <React.Fragment key={payment.name}>
                      <Grid item xs={6}>
                        <Typography gutterBottom>{payment.name}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography gutterBottom>{payment.detail}</Typography>
                      </Grid>
                    </React.Fragment>
                  ))}
                </Grid> */}
                  </Grid>
                </Grid>
              </React.Fragment>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => ({
  fetchItemsInCart: (userId) => dispatch(fetchItemsInCart(userId)),
});

export default connect(mapState, mapDispatch)(Review);
