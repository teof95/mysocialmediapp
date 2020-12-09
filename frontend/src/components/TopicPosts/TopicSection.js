import React from "react";
import Moment from "react-moment";

const TopicSection = ({
  auth,
  post,
  addHateToTopicPage,
  removeHateFromPost,
}) => {
  return (
    <div className="topic-wrapper">
      <div className="topic-date">
        <Moment format="HH:mm YYYY-MM-DD">{post.date}</Moment>
      </div>

      <div className="topic-user">
        <img src={post.avatar} className="topic-avatar" alt="" />
        <p className="font__p p__size">abcabc11{post.userName}</p>
      </div>

      <div className="topic-section">
        <p>{post.textOfThePost}</p>
        <div className="topic-section-links">
          <div className="like-item">
            <p
              className="font__p font__bold p__size hover"
              onClick={() => {
                if (post.hates.find((hate) => hate.user === auth.user._id)) {
                  post.hates.find((hate) =>
                    removeHateFromPost(post._id, hate._id)
                  );
                } else {
                  addHateToTopicPage(post._id);
                }
              }}
            >
              <i
                className={
                  post.hates.find((hate) => hate.user === auth.user._id)
                    ? "fas fa-thumbs-up"
                    : "far fa-thumbs-up"
                }
              ></i>abcabc4👎{post.hates.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicSection;
