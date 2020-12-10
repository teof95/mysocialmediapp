import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_FAIL,
  CHANGE_PROFILE,
  CHANGE_USER_DATA_FAILED,
  CHECK_PASSWORDS,
  AUTH_FORM_SUCCESS,
  AUTH_FORM_FAIL,
  LOG_OUT,
  USER_IS_LOADED, 
  AUTH_ERROR, 
} from "../constants/all.constants";
import axios from "axios";
import setAuthenticationToken from "../middleware/setAuthenticationToken";

export const userLoaded = () => async (dispatch) => {
  if (localStorage.getItem("token")) {
    setAuthenticationToken(localStorage.getItem("token"));
  }
  try {
    const res = await axios.get(`http://hatebooksocial.herokuapp.com/api/users`);
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


export const changePassword = (newPassword) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ newPassword });
    const res = await axios.put(
      `http://hatebooksocial.herokuapp.com/api/users/change_user_password`,
      body,
      config
    );
    dispatch({
      type: CHANGE_PASSWORD,
      payload: res.data,
    });
    dispatch(userLoaded());
  } catch (error) {
    dispatch({
      type: CHANGE_PASSWORD_FAIL,
      payload: error,
    });
  }
};

export const changeUserData = (changeUserData, userDataToChange) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ changeUserData });
    const response = await axios.put(
      `http://hatebooksocial.herokuapp.com/api/users/change_user_data/${userDataToChange}`,
      body,
      config
    );
    dispatch({
      type: CHANGE_PROFILE,
      payload: response.data,
    });
    alert("Data has changed");
  } catch (error) {
    dispatch({
      type: CHANGE_USER_DATA_FAILED,
      payload: error,
    });
  }
};

export const checkPasswords = (passwordToCheck) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ passwordToCheck });
    const res = await axios.put(
      `http://hatebooksocial.herokuapp.com/api/users/check_acutal_password`,
      body,
      config
    );
    dispatch({
      type: CHECK_PASSWORDS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CHANGE_PASSWORD_FAIL,
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

    const response = await axios.post(
      `http://hatebooksocial.herokuapp.com/api/users/login`,
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

    const response = await axios.post(
      `http://hatebooksocial.herokuapp.com/api/users/register`,
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

