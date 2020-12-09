import React, { useState } from "react";
import { connect } from "react-redux";
import { createPost, clearPost } from "../actions/post.actions";
import { Link } from "react-router-dom";


const AddPost = ({ clearPost, createPost, posts: { post } }) => {
  let [textOfThePost, setTextOfThePost] = useState("");
  

  const onChange = (e) => setTextOfThePost(e.target.value);

  const submitData = () => {
    if (textOfThePost !== "" && textOfThePost !== null) {
      createPost(textOfThePost);
    } else {
      alert("Text is empty!");
    }
    setTextOfThePost("");
    setTimeout(() => {
    clearPost();
  }, 5000);
  };

  return (
    <div className="make-post-wrapper">
      {post === null ? (
    <div className="tips-wrapper">
    <p className="font__p p__size font__bold app_color_font">
      <i className="fas fa-check-circle small_margin_right"></i>
      What do you hate today?
    </p>
    <br />

    <ul className="tips">
      <li className="tip-item">
        <p className="font__p">
          <i className="fas fa-check small_margin_right"></i>
          Do you want to say all those bad things to your boss?
        </p>
      </li>

      <li className="tip-item">
        <p className="font__p">
          <i className="fas fa-check small_margin_right"></i>
          Do you want a revenge from that kid in the scool who bullied you?
        </p>
      </li>

      <li className="tip-item">
        <p className="font__p">
          <i className="fas fa-check small_margin_right"></i>
          Do you want a revenge from your ex who dumbed you?
        </p>
      </li>

      <li className="tip-item">
        <p className="font__p">
          <i className="fas fa-check small_margin_right"></i>
          Start Your hate now!
        </p>
      </li>
    </ul>

    <form>
      <textarea
        type="text"
        placeholder="Type your hate..."
        value={textOfThePost}
        onChange={(e) => onChange(e)}
      />
      <div
        onClick={() => submitData()}
        className="app_color_background add-post-button font__p font__bold"
      >
        Add hate
      </div>
    </form>


  </div>      
  ) : (
    <div className="output">
      <div className="output-header">
        <p className="font__bold font__p app_color_font">HATE ADDED</p>
      </div>
      <div className="output-buttons-wrapper">
        <div className="output-buttons">
          <div
            onClick={() => clearPost()}
            className="new-post output-button app_color_background"
          >
            <p className="p__size font__p">Add New Hate!</p>
          </div>
          <div className="view-comment output-button app_color_background">
            <Link
              to="/topics"
              className="white__color__font"
              style={{ textDecoration: "none" }}
            >
              <p className="p__size font__p">View Hates!</p>
            </Link>
          </div>
        </div>
      </div>
    </div>

    )
      }
    </div>
  ); 
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  posts: state.posts,
});

const mapDispatchToProps = {
  createPost,
  clearPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
