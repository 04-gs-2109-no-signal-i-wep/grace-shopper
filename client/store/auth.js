import axios from 'axios';
import history from '../history';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token,
      },
    });
    console.log('this is res.data', res.data);
    return dispatch(setAuth(res.data));
  }
};

export const authenticate =
  (
    email_address,
    password,
    method,
    first_name,
    last_name,
    address_line_1,
    city,
    country,
    address_line_2
  ) =>
  async (dispatch) => {
    try {
      let res;
      if (method === 'login') {
        res = await axios.post(`/auth/login`, {
          email_address,
          password,
        });
      } else {
        res = await axios.post('/auth/signup', {
          email_address,
          password,
          first_name,
          last_name,
          address_line_1,
          city,
          country,
          address_line_2,
        });
      }
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
      history.push('/products');
    } catch (authError) {
      alert(authError.response.data);
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push('/login');
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      console.log('this is action.auth', action.auth);
      return action.auth;
    default:
      return state;
  }
}
