import React from "react";
import TopicPost from "./TopicPost";

const TopicPostsWrapper = ({
  isTheOldest,
  isTheMostCommented,
  isTheMostRecent,
  isTheMostHated,
  posts,
}) =>
  posts !== null &&
  posts.length > 0 &&
  posts.map((post) => (
    <TopicPost
      isTheOldest={isTheOldest}
      isTheMostCommented={isTheMostCommented}
      isTheMostRecent={isTheMostRecent}
      isTheMostHated={isTheMostHated}
      post={post}
      key={post._id}
    />
  ));

export default TopicPostsWrapper;
