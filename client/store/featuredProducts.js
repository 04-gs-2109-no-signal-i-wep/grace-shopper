import axios from 'axios';

//ACTION TYPES
const SET_FEATURED_PRODUCTS = 'SET_FEATURED_PRODUCTS';

//ACTION CREATORS
export const setFeaturedProducts = (featuredProducts) => ({
  type: SET_FEATURED_PRODUCTS,
  featuredProducts,
});

//THUNK
export const fetchFeaturedProducts = () => {
  return async (dispatch) => {
    try {
      const { data: featuredProducts } = await axios.get(
        '/api/featuredproducts'
      );
      dispatch(setFeaturedProducts(featuredProducts));
    } catch (error) {
      console.log(
        'An error occurred in the fetchFeaturedProducts thunk: ',
        error
      );
    }
  };
};

//REDUCER
export default function (state = [], action) {
  switch (action.type) {
    case SET_FEATURED_PRODUCTS:
      return action.featuredProducts;
    default:
      return state;
  }
}
