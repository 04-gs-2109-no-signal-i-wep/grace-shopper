import axios from 'axios';

const SET_PRODUCT = 'SET_PRODUCT';
const EDIT_PRODUCT = 'EDIT_PRODUCT';
const ADD_PRODUCT = 'ADD_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const TOKEN = "token";


const _setProduct = product => ({
  type: SET_PRODUCT,
  product
})

const _editProduct = product => ({
  type: EDIT_PRODUCT,
  product
})

const _addProduct = product => ({
  type: ADD_PRODUCT,
  product
})

const _deleteProduct = product => ({
  type: DELETE_PRODUCT,
  product
})

export const fetchProduct = (id) => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch(_setProduct(data));
    } catch (e) {
      console.log('Error in fetching product', e)
    }
  }
}

export const editProduct = (product, history) => {
  return async dispatch => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data: updated } = await axios.put(`/api/products/${product.id}`, product, {
          headers: {
            authorization: token,
          }
        });
        dispatch(_editProduct(updated));
        history.push(`/products/${product.id}`);
      } else {
        console.error("No token!");
      }
    } catch (e) {
      console.log('Error in editing product', e)
    }
  }
}

export const addProduct = (product) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/products', product);
      console.log('HERE IS THE PRODUCT DATA!', data);
      dispatch(_addProduct(data));
    } catch (e) {
      console.log('Error adding product!', e);
    }
  };
};

export const deleteProduct = (id, history) => {
  return async dispatch => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data: deleted } = await axios.delete(`/api/products/${id}`, {
          headers: {
            authorization: token,
          }
        });
        console.log(deleted)
        dispatch(_deleteProduct(deleted));
        history.push(`/products`)
      } else {
        console.error("No token!");
      }
      const { data: deleted } = await axios.delete(`/api/products/${id}`);
      dispatch(_deleteProduct(deleted));
      history.push(`/products`)
    } catch (e) {
      console.log('Error in deleting product', e)
    }
  }
}

let initialState = {
  allProducts: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      return action.product;
    case EDIT_PRODUCT:
      return action.product;
    case ADD_PRODUCT:
      return {
        ...state,
        allProducts: [...state.allProducts, action.product]
      }
    case DELETE_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
