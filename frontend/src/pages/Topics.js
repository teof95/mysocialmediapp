import React, { useState, useEffect } from "react";
import { getPosts } from "../actions/post.actions";
import { getMostRecentPosts } from "../actions/post.actions";
import { getMostCommentedPosts } from "../actions/post.actions";
import { getMostHatedPosts } from "../actions/post.actions";
import { searchTopics } from "../actions/post.actions";
import { connect } from "react-redux";
import TopicPostsWrapper from "../components/TopicPosts/TopicPostsWrapper";

const Topics = ({
  getPosts,
  getMostRecentPosts,
  getMostCommentedPosts,
  getMostHatedPosts,
  searchTopics,
  posts,
}) => {
  let [dataFromSearch, setDataFromSearch] = useState("");
  let [topicsSortType, setTopicsSortType] = useState({
    isTheOldest: false,
    isTheMostRecent: true,
    isTheMostCommented: false,
    isTheMostHated: false,
  });

  let {
    isTheMostCommented,
    isTheOldest,
    isTheMostHated,
    isTheMostRecent,
  } = topicsSortType;

  useEffect(() => {
    if (isTheOldest) getPosts();
    else if (isTheMostCommented) getMostCommentedPosts();
    else if (isTheMostHated) getMostHatedPosts();
    else getMostRecentPosts();
  }, []);

  const onChange = (e) => setDataFromSearch(e.target.value);

  const searchForTopic = () => {
    if (dataFromSearch !== "" || dataFromSearch !== null) {
      return searchTopics(dataFromSearch);
    } else {
      setTopicsSortType({
        isTheMostRecent: true,
        isTheMostCommented: false,
        isTheMostHated: false,
        isTheOldest: false,
      });
      getMostRecentPosts();
    }
  };

  const changeTopicsType = (changedType) => {
    if (changedType === "isTheMostHated") {
      setTopicsSortType({
        isTheMostHated: true,
        isTheOldest: false,
        isTheMostCommented: false,
        isTheMostRecent: false,
      });
      getMostHatedPosts();
    } else if (changedType === "isTheOldest") {
      setTopicsSortType({
        isTheMostHated: false,
        isTheOldest: true,
        isTheMostCommented: false,
        isTheMostRecent: false,
      });
      getPosts();
    } else if (changedType === "isTheMostCommented") {
      setTopicsSortType({
        isTheMostHated: false,
        isTheOldest: false,
        isTheMostCommented: true,
        isTheMostRecent: false,
      });
      getMostCommentedPosts();
    } else {
      setTopicsSortType({
        isTheMostHated: false,
        isTheOldest: false,
        isTheMostCommented: false,
        isTheMostRecent: true,
      });
      getMostRecentPosts();
    }
  };

  return (
    <div>
      <header className="topics-header">
        <p className="app_color_font font__bold font__p topics-headline">
          Topics
        </p>
        <br />

        <div
          className={
            isTheOldest
              ? "header-checkbox app_color_font p__size font__p font__bold"
              : "header-checkbox app_color_font p__size font__p"
          }
        >
          <input
            type="checkbox"
            value={isTheOldest}
            checked={isTheOldest}
            onChange={() => changeTopicsType("isTheOldest")}
          />
          <p onClick={() => changeTopicsType("isTheOldest")}>The Oldest</p>
        </div>

        <div
          className={
            isTheMostRecent
              ? "header-checkbox app_color_font p__size font__p font__bold"
              : "header-checkbox app_color_font p__size font__p"
          }
        >
          <input
            onChange={() => changeTopicsType("isTheMostRecent")}
            value={isTheMostRecent}
            checked={isTheMostRecent}
            type="checkbox"
          />
          <p onClick={() => changeTopicsType("isTheMostRecent")}>
            The most recent
          </p>
        </div>

        <div
          className={
            isTheMostHated
              ? "header-checkbox app_color_font p__size font__p font__bold"
              : "header-checkbox app_color_font p__size font__p"
          }
        >
          <input
            type="checkbox"
            checked={isTheMostHated}
            value={isTheMostHated}
            onChange={() => changeTopicsType("isTheMostHated")}
          />
          <p onClick={() => changeTopicsType("isTheMostHated")}>
            The Most Hated
          </p>
        </div>

        <div
          className={
            isTheMostCommented
              ? "header-checkbox app_color_font p__size font__p font__bold"
              : "header-checkbox app_color_font p__size font__p"
          }
        >
          <input
            type="checkbox"
            checked={isTheMostCommented}
            value={isTheMostCommented}
            onChange={() => changeTopicsType("isTheMostCommented")}
          />
          <p onClick={() => changeTopicsType("isTheMostCommented")}>
            The Most Commented
          </p>
        </div>

        <form className="search-topic-wrapper">
          <textarea
            type="submit"
            value={dataFromSearch}
            onChange={(e) => onChange(e)}
          />

          <div
            className="topic-search-button app_color_background font__p font__bold"
            onClick={() => searchForTopic()}
          >
            Search for topic
          </div>
        </form>
      </header>

      <div className="topics-wrapper">
        <TopicPostsWrapper
          isTheOldest={isTheOldest}
          isTheMostCommented={isTheMostCommented}
          isTheMostRecent={isTheMostRecent}
          isTheMostHated={isTheMostHated}
          posts={posts.posts}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

const mapDispatchToProps = {
  getPosts,
  getMostRecentPosts,
  getMostCommentedPosts,
  getMostHatedPosts,
  searchTopics,
};

export default connect(mapStateToProps, mapDispatchToProps)(Topics);
