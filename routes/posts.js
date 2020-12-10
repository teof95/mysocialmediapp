const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");
const { createPostValidator, searchForPostValidator, addCommentValidator} = require("../middleware/express-validator/expressValidator");
const getPosts = require("../functions/postFunctions/getPosts");
const getMostHatedPosts = require("../functions/postFunctions/getMostHatedPosts");
const getPostsByDate = require("../functions/postFunctions/getPostsByDate");
const getMostCommented = require("../functions/postFunctions/getMostCommented");
const getSinglePost = require("../functions/postFunctions/getSinglePost");
const getUserPostsByMiddleware = require("../functions/postFunctions/getUserPostsByMiddleware");
const getUserPostsById = require("../functions/postFunctions/getUserPostsById");
const createPost = require("../functions/postFunctions/createPost");
const searchForPost = require("../functions/postFunctions/searchForPost");
const addHate = require("../functions/postFunctions/addHate");
const addComment = require("../functions/postFunctions/addComment");
const hateComment = require("../functions/postFunctions/hateComment");
const removePost = require("../functions/postFunctions/removePost");
const removeHateFromPost = require("../functions/postFunctions/removeHateFromPost");
const removeComment = require("../functions/postFunctions/removeComment");
const removeHateFromComment = require("../functions/postFunctions/removeHateFromComment");

router.get("/posts", getPosts);

router.get("/posts/most_hated", getMostHatedPosts);

router.get("/posts/the_most_recent", getPostsByDate);

router.get("/posts/the_most_commented", getMostCommented);

router.get("/single_post/:post_id", getSinglePost);

router.get("/user_posts/:user_id", getUserPostsById);

router.get("/user_posts", authentication, getUserPostsByMiddleware);

router.post("/", authentication, createPostValidator, createPost);

router.put("/search_for_post", searchForPostValidator, searchForPost);

router.put("/hates/:post_id", authentication, addHate);

router.put("/add_comment/:post_id", authentication, addCommentValidator, addComment);

router.put("/hate_comment/:post_id/:comment_id", authentication, hateComment);

router.delete("/delete_post/:post_id", authentication, removePost);

router.delete("/remove_hate_from_post/:post_id/:hate_id", authentication,removeHateFromPost);

router.delete( "/remove_comment/:post_id/:comment_id", authentication, removeComment);

router.delete("/remove_hate_from_comment/:post_id/:comment_id/:hate_id", authentication, removeHateFromComment);

module.exports = router;
