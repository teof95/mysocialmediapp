import React from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { removeHateFromComment } from "../../actions/post.actions";
import { addHateToComment } from "../../actions/post.actions";
import Spinner from "../../Spinner";
import thumbsdown from "../../pages/images/dislike.png";


const Comment = ({
  comment,
  auth,
  post,
  removeHateFromComment,
  addHateToComment,
}) => {
  return post === null || post === [] ? (
    <div className="all-page-wrapper flex__center">
      <Spinner />
    </div>
  ) : (
    <div className="topic-wrapper" key={comment._id}>
      <div className="topic-date">
        <Moment format="HH:mm YYYY-MM-DD">{comment.date}</Moment>
      </div>

      <div className="topic-user">
        <img src={comment.avatar} className="topic-avatar" alt="" />
        <p className="font__p p__size">{comment.name}</p>
      </div>

      <div className="topic-section">
        <p>{comment.textOfTheComment}</p>
        <div className="topic-section-links">
          <div
            className="like-section"
            style={{ color: "rgb(42, 9, 9)" }}
            onClick={() => {
              if (comment.hates.find((hate) => hate.user === auth.user._id)) {
                comment.hates.find((hate) =>
                  removeHateFromComment(post._id, comment._id, hate._id)
                );
              } else {
                addHateToComment(post._id, comment._id);
              }
            }}
          >
            <div className="font__p font__bold p__size like-item">
              <i
                className={
                  comment.hates.find((hate) => hate.user === auth.user._id)
                    ? "fas fa-thumbs-up"
                    : "far fa-thumbs-up"
                }
              ></i>
            </div>

            <div className="font__p font__bold p__size likes-length-item">
              <p>             
              <img src={thumbsdown} className="thubsdown" alt="" />
              {comment.hates.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.posts.post,
});

const mapDispatchToProps = {
  removeHateFromComment,
  addHateToComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
