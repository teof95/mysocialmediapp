import React from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { addHateToPost } from "../../actions//post.actions";
import { removeHateFromTopicPost } from "../../actions/post.actions";
import thumbsdown from "../../pages/images/dislike.png";


const TopicPost = ({
  isTheOldest,
  isTheMostCommented,
  isTheMostRecent,
  isTheMostHated,
  post,
  removeHateFromTopicPost,
  addHateToPost,
  auth,
}) => {
  return (
    <div className="topic-wrapper">
      <div className="topic-date">
        <Moment format="HH:mm YYYY-MM-DD">{post.date}</Moment>
      </div>

      <div className="topic-user">
      <Link to={`/topics/topic/${post._id}`}>
        <img src={post.avatar} className="topic-avatar" alt="" />
        </Link>
        <p className="font__p p__size">{post.name}</p>
      </div>

      <div className="topic-section">
        <p>{post.textOfThePost}</p>
        <div className="topic-section-links">
          <div className="like-section" style={{ color: "rgb(42, 9, 9)" }}>
            <div
              className="font__p font__bold p__size like-item"
              onClick={() => {
                if (post.hates.find((hate) => hate.user === auth.user._id)) {
                  post.hates.find((hate) =>
                    removeHateFromTopicPost(
                      post._id,
                      hate._id,
                      isTheOldest,
                      isTheMostRecent,
                      isTheMostCommented,
                      isTheMostHated
                    )
                  );
                } else {
                  addHateToPost(
                    post._id,
                    isTheOldest,
                    isTheMostRecent,
                    isTheMostCommented,
                    isTheMostHated
                  );
                }
              }}
            >
              <i
                className={
                  post.hates.find((hate) => hate.user === auth.user._id)
                    ? "fas fa-thumbs-up"
                    : "far fa-thumbs-up"
                }
              ></i>
            </div>

            <div className="font__p font__bold p__size likes-length-item">
            
            <img src={thumbsdown} className="thubsdown" alt="" />
            {post.hates.length}
            </div>
          </div>

          <div className="topic-comment-section font__p font__bold p__size">
            <i className="far fa-comment"></i>
            Comments: {post.comments.length}
          </div>

          <div className="link-to-post-page-button app_color_background font__p font__bold p__size">
            <Link to={`/topics/topic/${post._id}`}>View more</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  addHateToPost,
  removeHateFromTopicPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicPost);
