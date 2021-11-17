import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useState, useEffect } from "react";

export default function GuestCart(props) {
  let [cart, setCart] = useState([]);
  let guestCart = JSON.parse(window.localStorage.cart);
  console.log("are you in guest cart?", guestCart);

  let localCart = localStorage.getItem("cart");

  const editItem = (itemID, amount) => {
    let cartCopy = [...cart];

    //find if item exists, just in case
    let existentItem = cartCopy.find((item) => item.ID == itemID);

    //if it doesnt exist simply return
    if (!existentItem) return;

    //continue and update quantity
    existentItem.quantity += amount;

    //validate result
    if (existentItem.quantity <= 0) {
      //remove item  by filtering it from cart array
      cartCopy = cartCopy.filter((item) => item.ID != itemID);
    }

    //again, update state and localState
    setCart(cartCopy);

    let cartString = JSON.stringify(cartCopy);
    localStorage.setItem("cart", cartString);
  };

  const removeItem = (productId) => {
    console.log('removing item')
    useEffect(() => {
      async function init() {
        const data = await guestCart.filter((product) => {
          product.productId !== productId;
        });
        setCart(JSON.parse(data));
      }
      init();
    });
  };

  let productNameMap = {};
  if (guestCart.length > 0) {
    guestCart.forEach((product) => {
      productNameMap[product.productId] = product.name;
    });
  }

  return (
    <div className="cartReviewDiv">
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Order summary
        </Typography>
        <List disablePadding>
          {guestCart.map((orderRow) => (
            <ListItem
              key={orderRow.orderId + orderRow.productId}
              sx={{ py: 1, px: 0 }}
            >
              <ListItemText
                primary={productNameMap[orderRow.productId]}
                secondary={
                  <ButtonGroup
                    size="small"
                    aria-label="small outlined button group"
                  >
                    <Button
                      onClick={() =>
                        this.handleIncrement(
                          orderRow.orderId,
                          orderRow.productId,
                          orderRow.quantity
                        )
                      }
                    >
                      +
                    </Button>
                    {<Button disabled>{orderRow.quantity}</Button>}
                    {
                      <Button
                        onClick={() =>
                          this.handleDecrement(
                            orderRow.orderId,
                            orderRow.productId,
                            orderRow.quantity
                          )
                        }
                      >
                        -
                      </Button>
                    }
                    <Button onClick={() => this.removeItem(orderRow.productId)}>
                      Delete
                    </Button>
                  </ButtonGroup>
                }
              />
              <Typography variant="body2">${orderRow.price}</Typography>
            </ListItem>
          ))}

          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {/* ${cart[0].order_total} */}
            </Typography>
          </ListItem>
        </List>
      </React.Fragment>
    </div>
  );
}
