import React, { useEffect } from "react";
import { connect } from "react-redux";
import { clearPost } from "../actions/post.actions";
import { getPost } from "../actions/post.actions";
import { removeHateFromPost } from "../actions/post.actions";
import { addHateToTopicPage } from "../actions/post.actions";
import { createComment } from "../actions/post.actions";
import Spinner from "../Spinner";
import CommentsWrapper from "./Comments/CommentsWrapper";
import TopicSection from "./TopicPosts/TopicSection";
import TopicPageForm from "./TopicPosts/TopicPageForm";

const TopicPage = ({
  clearPost,
  getPost,
  removeHateFromPost,
  addHateToTopicPage,
  createComment,
  match,
  auth,
  post,
}) => {
  useEffect(() => {
    clearPost();
    getPost(match.params.topic_id);
  }, []);

  return post === null || post === [] ? (
    <div className="all-page-wrapper flex__center">
      <Spinner />
    </div>
  ) : (
    <div className="main-post-wrapper">
      <TopicSection
        post={post}
        auth={auth}
        removeHateFromPost={removeHateFromPost}
        addHateToTopicPage={addHateToTopicPage}
      />

      <div className="post-page-header">
        <TopicPageForm auth={auth} post={post} createComment={createComment} />
      </div>

      <div className="comments-align-left">
        <CommentsWrapper comments={post.comments} />
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  clearPost,
  getPost,
  removeHateFromPost,
  addHateToTopicPage,
  createComment,
};

const mapStateToProps = (state) => ({
  post: state.posts.post,
  auth: state.auth,
});

export default connect(mapStateToProps, mapDispatchToProps)(TopicPage);
