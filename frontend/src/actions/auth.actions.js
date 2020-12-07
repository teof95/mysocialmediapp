import {
    AUTH_FORM_SUCCESS,
    AUTH_FORM_FAIL,
    AUTH_ERROR,
    USER_IS_LOADED,
    LOG_OUT,
    // CHANGE_PASSWORD_FAIL,
    // CHECK_PASSWORDS,
    // CHANGE_PROFILE,
    // CHANGE_USER_DATA_FAILED,
    // GET_USERS,
    // SEARCH_BY_USERNAME,
  } from "../constants/auth.constants";
  import axios from "axios";
  import setAuthenticationToken from "../middleware/setAuthenticationToken";



  export const logOut = () => (dispatch) => {
    dispatch({ type: LOG_OUT });
  };

  export const registerUser = (userData) => async (dispatch) => {
      try {
        const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const body = JSON.stringify(userData);

//   neeed to change this url if I want to deploy to heroku
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        body,
        config
      );
  
      dispatch({
        type: AUTH_FORM_SUCCESS,
        payload: response.data,
      });
      dispatch(userLoaded());
          
      } catch (error) {
        dispatch({
            type: AUTH_FORM_FAIL,
            payload: error,
          });
      }
  };

  export const loginUser = (userData) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const body = JSON.stringify(userData);
  
//   neeed to change this url if I want to deploy to heroku
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        body,
        config
      );
  
      dispatch({
        type: AUTH_FORM_SUCCESS,
        payload: response.data,
      });
      dispatch(userLoaded());
    } catch (error) {
      dispatch({
        type: AUTH_FORM_FAIL,
        payload: error,
      });
    }
  };


  export const userLoaded = () => async (dispatch) => {
    if (localStorage.getItem("token")) {
      setAuthenticationToken(localStorage.getItem("token"));
    }
    try {
    //   neeed to change this url if I want to deploy to heroku

      const res = await axios.get("http://localhost:5000/api/users");
      dispatch({
        type: USER_IS_LOADED,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };
  
  