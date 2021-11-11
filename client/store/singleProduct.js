import axios from 'axios';

const SET_PRODUCT = 'SET_PRODUCT';
const EDIT_PRODUCT = 'EDIT_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';

const _setProduct = product => ({
  type: SET_PRODUCT,
  product
})

const _editProduct = product => ({
  type: EDIT_PRODUCT,
  product
})

const _deleteProduct = product => ({
  type: DELETE_PRODUCT,
  product
})

export const fetchProduct = (id) => {
  return async dispatch => {
    try {
      const { product } = await axios.get(`/api/products/${id}`);
      dispatch(_setProduct(product));
    } catch (e) {
      console.log('Error in fetching product', e)
    }
  }
}

export const editProduct = (product, history) => {
  return async dispatch => {
    try {
      const { data: updated } = await axios.put(`/api/products/${product.id}`, product);
      dispatch(_editProduct(updated));
      history.push(`/products/${product.id}`);
    } catch (e) {
      console.log('Error in editing product', e)
    }
  }
}

export const deleteProduct = (id, history) => {
  return async dispatch => {
    try {
      const { data: deleted } = await axios.delete(`/api/products/${id}`);
      dispatch(_deleteProduct(deleted));
      history.push(`/products`);
    } catch (e) {
      console.log('Error in deleting product', e)
    }
  }
}

export default (state = {}, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      return action.product;
    case EDIT_PRODUCT:
      return state.map(product => (product.id === action.product.id ? action.product : product));
    case DELETE_PRODUCT:
      return state.filter(product => product.id !== action.product.id)
    default:
      return state;
  }
}
