import axios from "axios";

// Action types
const SET_USERS = "SET_USERS";
const TOKEN = "token";
const DELETE_USER = 'DELETE_USER';

// Action creators
const _setUsers = (users) => ({
  type: SET_USERS,
  payload: users,
});

const _deleteUser = user => ({
  type: DELETE_USER,
  user
})

// Thunk creators
export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data } = await axios.get("/api/users", {
          headers: {
            authorization: token,
          },
        });
        dispatch(_setUsers(data));
    } else {
      console.error("No token!");
    }
    } catch (error) {
      console.error("Problem fetching user data!", error);
    }
  };
};

export const deleteUser = (id, history) => {
  return async dispatch => {
    try {
      const {data: deleted} = await axios.delete(`/api/users/${id}`);
      console.log('adfdfdsfdf' + deleted)
      dispatch(_deleteUser(deleted));
      history.push(`/users`)
    } catch (e) {
      console.log('Error deleting user from database', e)
    }
  }
}

const initialState = {
  allUsers: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    case DELETE_USER:
      return {
        ...state,
        allUsers: state.allUsers.filter((user) => user.id !== action.user.id),
      };
    default:
      return state;
  }
}



