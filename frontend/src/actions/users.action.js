import { 
GET_USER_BY_ID, 
USER_ERROR, 
GET_USER_POSTS,
GET_POST_BY_USER_ID,
GET_USERS,
SEARCH_BY_USERNAME
} from "../../constants/users.constants";

import axios from "axios";


export const getUserById = (user_id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/users/get_user_by_id/${user_id}`
    );
    dispatch({ type: GET_USER_BY_ID, payload: res.data });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error,
    });
  }
};

export const getUserPosts = () => async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/posts/user_posts`);
      dispatch({ type: GET_USER_POSTS, payload: res.data });
    } catch (error) {
      dispatch({
        type: USER_ERROR,
        payload: error,
      });
    }
  };

  export const getUserPostsById = (user_id) => async (dispatch) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/posts/user_posts/${user_id}`
      );
      dispatch({ type: GET_POST_BY_USER_ID, payload: res.data });
    } catch (error) {
      dispatch({
        type: USER_ERROR,
        payload: error,
      });
    }
  };

  export const getUsers = () => async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/users`);
      dispatch({ type: GET_USERS, payload: res.data });
    } catch (error) {
      dispatch({
        type: USER_ERROR,
        payload: error,
      });
    }
  };

  export const searchByUsername = (userNameFromSearch) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ userNameFromSearch });
      const response = await axios.put(
        `http://localhost:5000/api/users/search_by_username`,
        body,
        config
      );
      dispatch({
        type: SEARCH_BY_USERNAME,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: USER_ERROR,
        payload: error,
      });
    }
  };