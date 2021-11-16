import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { fetchItemsInCart } from '../../store/cart';
import { connect } from 'react-redux';

export class Review extends React.Component {
  componentDidMount() {
    this.props.fetchItemsInCart(this.props.auth.id);
  }

  render() {
    console.log(this.props.auth.id);

    return (
      <p>hi</p>
      // <React.Fragment>
      //   <Typography variant="h6" gutterBottom>
      //     Order summary
      //   </Typography>
      //   <List disablePadding>
      //     {cart.map((product) => (
      //       <ListItem key={product.id} sx={{ py: 1, px: 0 }}>
      //         <ListItemText primary={product.name} secondary={product.desc} />
      //         <Typography variant="body2">{product.price}</Typography>
      //       </ListItem>
      //     ))}

      //     <ListItem sx={{ py: 1, px: 0 }}>
      //       <ListItemText primary="Total" />
      //       <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
      //         $34.06
      //       </Typography>
      //     </ListItem>
      //   </List>
      //   <Grid container spacing={2}>
      //     <Grid item xs={12} sm={6}>
      //       <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
      //         Shipping
      //       </Typography>
      //       <Typography gutterBottom>John Smith</Typography>
      //       <Typography gutterBottom>{addresses.join(', ')}</Typography>
      //     </Grid>
      //     <Grid item container direction="column" xs={12} sm={6}>
      //       <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
      //         Payment details
      //       </Typography>
      //       <Grid container>
      //         {payments.map((payment) => (
      //           <React.Fragment key={payment.name}>
      //             <Grid item xs={6}>
      //               <Typography gutterBottom>{payment.name}</Typography>
      //             </Grid>
      //             <Grid item xs={6}>
      //               <Typography gutterBottom>{payment.detail}</Typography>
      //             </Grid>
      //           </React.Fragment>
      //         ))}
      //       </Grid>
      //     </Grid>
      //   </Grid>
      // </React.Fragment>
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
