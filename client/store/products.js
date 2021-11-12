import axios from "axios";

// Action types
const SET_PRODUCTS = "SET_PRODUCTS";

// Action creators
export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  payload: products,
});

// Thunk creators
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/products");
      dispatch(setProducts(data));
    } catch (error) {
      console.error("Problem fetching products!", error);
    }
  };
};

const initialState = {
  allProducts: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload,
      };
    default:
      return state;
  }
};


