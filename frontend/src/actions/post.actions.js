import {
MAKE_POST,
POST_ERROR,
GET_POSTS,
GET_POST,
CLEAR_POSTS,
CLEAR_POST,
SEARCH_TOPICS,
MOST_HATED_POSTS,
MOST_COMMENTED,
THE_MOST_RECENT_POSTS,
REMOVE_HATE_FROM_COMMENT,
ADD_HATE,
REMOVE_COMMENT, 
HATE_COMMENT,
ADD_COMMENT, 
REMOVE_POST,
REMOVE_HATE,


} from "../constants/all.constants";

import axios from "axios";
import { getUserPosts } from "../actions/users.action";




// --------------> comments actions<-------------------

export const createComment = (textOfTheComment, post_id) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ textOfTheComment });
    const res = await axios.put(
      `https://hatebooksocial.herokuapp.com/api/posts/add_comment/${post_id}`,
      body,
      config
    );

    dispatch({ type: ADD_COMMENT, payload: res.data });
    dispatch(getPost(post_id));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};

export const removeComment = (post_id, comment_id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `https://hatebooksocial.herokuapp.com/api/posts/remove_comment/${post_id}/${comment_id}`
    );
    dispatch({ type: REMOVE_COMMENT, payload: res.data });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};


 

// -------------->add hate actions<---------------------

  export const addHateToComment = (post_id, comment_id) => async (dispatch) => {
    try {
      const res = await axios.put(
        `https://hatebooksocial.herokuapp.com/api/posts/hate_comment/${post_id}/${comment_id}`
      );
      dispatch({ type: HATE_COMMENT, payload: res.data });
      dispatch(getPost(post_id));
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: error,
      });
    }
  };

  export const addHateToPost = (
    post_id,
    isOldest,
    isMostRecent,
    isMostCommented,
    isMostHated
  ) => async (dispatch) => {
    try {
      const res = await axios.put(
        `https://hatebooksocial.herokuapp.com/api/posts/hates/${post_id}`
      );
      dispatch({ type: ADD_HATE, payload: res.data });
  
      if (isOldest) {
        dispatch(getPosts());
      } else if (isMostRecent) {
        dispatch(getMostRecentPosts());
      } else if (isMostCommented) {
        dispatch(getMostCommentedPosts());
      } else if (isMostHated) {
        dispatch(getMostHatedPosts());
      }
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: error,
      });
    }
  };


  export const addHateToTopicPage = (post_id) => async (dispatch) => {
    try {
      const res = await axios.put(
        `https://hatebooksocial.herokuapp.com/api/posts/hates/${post_id}`
      );
      dispatch({ type: ADD_HATE, payload: res.data });
      dispatch(getPost(post_id));
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: error,
      });
    }
  };

// ---------------->remove hate section<-----------------
  export const removeHateFromComment = (post_id, comment_id, hate_id) => async (
    dispatch
  ) => {
    try {
      const res = await axios.delete(
        `https://hatebooksocial.herokuapp.com/api/posts/remove_hate_from_comment/${post_id}/${comment_id}/${hate_id}`
      );
      dispatch({ type: REMOVE_HATE_FROM_COMMENT, payload: res.data });
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: error,
      });
    }
  };

  export const removeHateFromPost = (post_id, hate_id) => async (dispatch) => {
    try {
      const res = await axios.delete(
        `https://hatebooksocial.herokuapp.com/api/posts/remove_hate_from_post/${post_id}/${hate_id}`
      );
      dispatch({ type: REMOVE_POST, payload: res.data });
      dispatch(getPost(post_id));
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: error,
      });
    }
  };

  export const removeHateFromTopicPost = (
    post_id,
    hate_id,
    isOldest,
    isMostRecent,
    isMostCommented,
    isMostHated
  ) => async (dispatch) => {
    try {
      const res = await axios.delete(
        `https://hatebooksocial.herokuapp.com/api/posts/remove_hate_from_post/${post_id}/${hate_id}`
      );
      dispatch({
        type: REMOVE_HATE,
        payload: res.data,
      });
      if (isOldest) {
        dispatch(getPosts());
      } else if (isMostRecent) {
        dispatch(getMostRecentPosts());
      } else if (isMostCommented) {
        dispatch(getMostCommentedPosts());
      } else if (isMostHated) {
        dispatch(getMostHatedPosts());
      }
    } catch (error) {
      dispatch({ type: POST_ERROR });
    }
  };

  

// ------------------------> Posts actions <-----------------------


export const clearPost = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_POST });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};

export const clearPosts = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_POSTS });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};

export const createPost = (textOfThePost) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ textOfThePost });
    const res = await axios.post(
      `https://hatebooksocial.herokuapp.com/api/posts`,
      body,
      config
    );
      dispatch({ type: MAKE_POST, payload: res.data });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};

export const getMostCommentedPosts = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://hatebooksocial.herokuapp.com/api/posts/posts/the_most_commented`
    );
    dispatch({ type: MOST_COMMENTED, payload: res.data });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};

export const getMostHatedPosts = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://hatebooksocial.herokuapp.com/api/posts/posts/most_hated`
    );
    dispatch({ type: MOST_HATED_POSTS, payload: res.data });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};

export const getMostRecentPosts = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://hatebooksocial.herokuapp.com/api/posts/posts/the_most_recent`
    );
    dispatch({ type: THE_MOST_RECENT_POSTS, payload: res.data });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};

export const getPost = (post_id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://hatebooksocial.herokuapp.com/api/posts/single_post/${post_id}`
    );
    dispatch({ type: GET_POST, payload: res.data });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get(`https://hatebooksocial.herokuapp.com/api/posts/posts`);
    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};

// export const getUserPosts = () => async (dispatch) => {
//   try {
//     const res = await axios.get(`https://hatebooksocial.herokuapp.com/api/posts/user_posts`);
//     dispatch({ type: GET_USER_POSTS, payload: res.data });
//   } catch (error) {
//     dispatch({
//       type: USER_ERROR,
//       payload: error,
//     });
//   }
// };

export const removePost = (post_id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `https://hatebooksocial.herokuapp.com/api/posts/delete_post/${post_id}`
    );
    dispatch({ type: REMOVE_POST, payload: res.data });
    dispatch(getUserPosts());
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};




export const searchTopics = (searchInput) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ searchInput });
    const res = await axios.put(
      `https://hatebooksocial.herokuapp.com/api/posts/search_for_post`,
      body,
      config
    );

    dispatch({ type: SEARCH_TOPICS, payload: res.data });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};

