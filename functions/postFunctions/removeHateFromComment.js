const Post = require("../../schemas/Post");

module.exports = async (req, res) => {
  try {
    let post = await Post.findById(req.params.post_id);

    if (!post) return res.status(404).json("Post not found");

    const comment = post.comments.find(
      (comment) => comment._id.toString() === req.params.comment_id.toString()
    );

    const removeHateFromComment = comment.hates.filter(
      (hate) => hate._id.toString() !== req.params.hate_id.toString()
    );

    comment.hates = removeHateFromComment;

    await post.save();

    res.json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server Error...");
  }
};
