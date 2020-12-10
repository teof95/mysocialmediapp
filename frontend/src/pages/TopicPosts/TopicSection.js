import React from "react";
import Moment from "react-moment";
import thumbsdown from "../../pages/images/dislike.png";


const TopicSection = ({
  auth,
  post,
  addHateToTopicPage,
  removeHateFromPost,
}) => {
  return (
    <div className="topic-wrapper">
      asdfasdf topicsection
      <div className="topic-date">
        <Moment format="HH:mm YYYY-MM-DD">{post.date}</Moment>
      </div>

      <div className="topic-user">
        <img src={post.avatar} className="topic-avatar" alt="" />
        <p className="font__p p__size">abcabcabc10{post.name}</p>
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
              > </i>
              abcabc2<img src={thumbsdown} className="thubsdown" alt="" />
              {post.hates.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicSection;
