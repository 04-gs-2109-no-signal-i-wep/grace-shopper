import axios from "axios";

// Action types
const SET_USERS = "SET_USERS";
const TOKEN = "token";

// Action creators
export const setUsers = (users) => ({
  type: SET_USERS,
  payload: users,
});

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
        dispatch(setUsers(data));
    } else {
      console.error("No token!");
    }
    } catch (error) {
      console.error("Problem fetching user data!", error);
    }
  };
};

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
    default:
      return state;
  }
}



