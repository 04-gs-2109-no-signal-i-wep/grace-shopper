import axios from 'axios';

//ACTION TYPES
const SET_CART = 'SET_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY';
const DELETE_ITEM_FROM_CART = 'DELETE_ITEM';
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
});
const _updateItemQuantity = (itemAdjusted) => ({
  type: UPDATE_ITEM_QUANTITY,
  itemAdjusted,
});

const _deleteItemFromCart = (itemDeleted) => ({
  type: DELETE_ITEM_FROM_CART,
  itemDeleted,
});

//THUNKS

//make an edge case where the cart is empty
export const fetchItemsInCart = (userId) => {
  return async (dispatch) => {
    try {
      const { data: itemsInCart } = await axios.get(
        `/api/orders/cart/${userId}`
      );
      dispatch(setCart(itemsInCart));
    } catch (error) {
      console.log('An error occurred in the fetchItemsInCart thunk');
    }
  };
};

export const addItemToCart = (userId, productId) => {
  return async (dispatch) => {
    try {
      const { data: itemAdded } = await axios.put(
        `/api/orders/addToCart/${userId}/${productId}`
      );
      dispatch(_addToCart(itemAdded));
    } catch (error) {
      console.log('An error occurred in the addItemToCart thunk: ', error);
    }
  };
};

export const updateItemQuantity = (userId, productId, quantity) => {
  return async (dispatch) => {
    try {
      const { data: itemUpdated } = await axios.put(
        `/api/orders/cart/updateItemQuantity/${userId}/${productId}`,
        quantity
      );
      dispatch(_updateItemQuantity(itemUpdated));
    } catch (error) {
      console.log('An error occurred in the updateItemQuantity thunk: ', error);
    }
  };
};

export const checkoutCart = (userId) => {
  return async (dispatch) => {
    try {
      const { data: newCart } = await axios.put(
        `/api/orders/cart/checkout/${userId}`
      );
      dispatch(setCart(newCart));
    } catch (error) {
      console.log('An error occurred in the checkoutCart thunk: ', error);
    }
  };
};

export const deleteItemFromCart = (userId, productId) => {
  return async (dispatch) => {
    try {
      const { data: deletedItem } = await axios.delete(
        `/cart/deleteItem/${userId}/${productId}`
      );
      dispatch(_deleteItemFromCart(deletedItem));
    } catch (error) {
      console.log('An error occurred in the deleteItemFromCart thunk: ', error);
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
    case UPDATE_ITEM_QUANTITY:
      return state.map((item) =>
        item.id === action.itemAdjusted.id ? action.itemAdjusted : item
      );
    case DELETE_ITEM_FROM_CART:
      return state.filter((item) => item.id !== action.item.id);
    default:
      return state;
  }
}
