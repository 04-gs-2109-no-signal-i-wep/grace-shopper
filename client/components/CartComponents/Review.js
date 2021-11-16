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

export class Review extends React.Component {
  componentDidMount() {
    console.log(this.props);
    this.props.fetchItemsInCart(this.props.auth.id);
  }

  render() {
    const { cart } = this.props;
    return (
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
                      <FormControl fullWidth>
                        <InputLabel
                          variant="standard"
                          htmlFor="uncontrolled-native"
                        >
                          Quantity
                        </InputLabel>
                        <NativeSelect
                          defaultValue={orderRow.quantity}
                          inputProps={{
                            name: 'quantity',
                            id: 'uncontrolled-native',
                          }}
                        >
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                          <option value={6}>6</option>
                          <option value={7}>7</option>
                          <option value={8}>8</option>
                          <option value={9}>9</option>
                          <option value={10}>10</option>
                        </NativeSelect>
                      </FormControl>
                    }
                  />
                  <Typography variant="body2">
                    {orderRow.total_price}
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
                <Typography gutterBottom>John Smith</Typography>
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
