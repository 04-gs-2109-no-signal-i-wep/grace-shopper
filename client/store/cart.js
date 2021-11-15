import axios from 'axios';

//ACTION TYPES
const SET_CART = 'SET_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const MARK_AS_COMPLETE = 'MARK_AS_COMPLETE';
//make a delete item from cart
//need a way to mark a cart as complete -- check JPFP for this

//ACTION CREATORS
export const setCart = (itemsInCart) => ({
  type: SET_CART,
  itemsInCart,
});
const _addToCart = (itemAdded) => ({
  type: ADD_TO_CART,
  itemAdded,
}); //this will just update the cart and send us back a line that says what was added

//THUNKS
export const fetchItemsInCart = (jwt) => {
  return async (dispatch) => {
    try {
      const { data: itemsInCart } = await axios.get('/api/orders/cart', jwt);
      dispatch(setCart(itemsInCart));
    } catch (error) {
      console.log('An error occurred in the fetchItemsInCart thunk');
    }
  };
};

export const addItemToCart = (jwt, product, quantity) => {
  return async (dispatch) => {
    try {
      const { data: itemAdded } = await axios.get(
        '/api/orders/addToCart',
        jwt,
        product,
        quantity
      );
      dispatch(_addToCart(itemAdded));
    } catch (error) {
      console.log('An error occurred in the addItemToCart thunk: ', error);
    }
  };
};

//SUBREDUCER
export default function (state = [], action) {
  switch (action.type) {
    case SET_CART:
      return action.itemsInCart;
    case ADD_TO_CART:
      return [...state, action.itemAdded];
    ///DELETE FROM CART
    default:
      return state;
  }
}
