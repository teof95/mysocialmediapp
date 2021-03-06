const Post = require("../../schemas/Post");

module.exports = async (req, res) => {
  try {
    let post = await Post.findById(req.params.post_id);

    if (!post) return res.status(404).json("Post not found!");

    const commentFromPost = post.comments.find(
      (comment) => comment._id.toString() === req.params.comment_id.toString()
    );

    if (!commentFromPost) return res.status(404).json("Comment not found");

    let newHate = {
      user: req.user.id,
    };

    commentFromPost.hates.unshift(newHate);

    await post.save();

    res.json("Comment is Hated");
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server Error...");
  }
};
