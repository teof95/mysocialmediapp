// const express = require("express");
// const router = express.Router();
// const Post = require("../schemas/Post");
// const authentication = require("../middleware/authentication");
// const User = require("../schemas/User");
// const {check, validationResult} = require("express-validator");



// router.get("/posts", async (req, res) => {
//     try {
//         let posts = await Post.find();
//         res.json(posts);
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json("Server Error...");
//     }
//   });


//   router.get("/posts/most_hated", async (req, res) => {
//     try {
//         let posts = await Post.find().sort({ hates: -1 });
//         res.json(posts);
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json("Server Error...");
//     }
//   });

//   router.get("/posts/the_most_recent", async (req, res) => {
//     try {
//         let posts = await Post.find().sort({ date: -1 });
//         res.json(posts);
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json("Server Error...");
//     }
//   });

//   router.get("/posts/the_most_commented", async (req, res) => {
//     try {
//         let posts = await Post.find().sort({ comments: -1 });
//         res.json(posts);
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json("Server Error...");
//     }
//   });


//   router.get("/single_post/:post_id", async (req, res) => {
//     try {
//         let posts = await Post.findById(req.params.post_id);
//         res.json(posts);
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json("Server Error...");
//     }
//   });

//   router.get("/user_posts/:user_id", async (req, res) => {
//     try {
//         let posts = await Post.find({ user: req.params.user_id });
//         res.json(posts);
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json("Server Error...");
//     }
//   });

//   router.get("/user_posts", authentication, async (req, res) => {
//     try {
//         let posts = await Post.find();
//     let userPosts = posts.filter(
//       (post) => post.user.toString() === req.user.id.toString()
//     );
//     res.json(userPosts);
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json("Server Error...");
//     }
//   });



// router.post("/", 
//     authentication, [
//     check("textOfThePost", "Text is required").not().isEmpty()], 
//     async (req, res) => {
//         let { textOfThePost } = req.body;
//         const errors = validationResult(req);
//         if (!errors.isEmpty())
//           return res.status(400).json({ errors: errors.array() });
//         try {
//           let user = await User.findById(req.user.id).select("-password");
//           if (!user) return res.status(404).json("User not found");
      
//           let newPost = new Post({
//             textOfThePost,
//             name: user.name,
//             avatar: user.avatar,
//             user: req.user.id,
//           });
      
//           await newPost.save();
      
//           res.json("Post is created, congratulations!");
//         } catch (error) {
//           console.error(error);
//           return res.status(500).json("Server Error...");
//         }
//       }); 


//       router.put("/search_for_post", 
//       [
//         check("searchInput", "Search is empty").not().isEmpty()
//       ],
//       async (req, res) => {
//         const { searchInput } = req.body;
//         const errors = validationResult(req);
//         if (!errors.isEmpty())
//           return res.status(400).json({ errors: errors.array() });
//         try {
//           let posts = await Post.find();
//           if (searchInput === "" || searchInput === null) {
//             res.status(401).json(posts);
//           } else {
//             const findPostBySearchInput = posts.filter(
//               (post) =>
//                 post.textOfThePost.toString().toLowerCase().split(" ").join("") ===
//                 searchInput.toString().toLowerCase().split(" ").join("")
//             );
//             res.json(findPostBySearchInput);
//           }
//         } catch (error) {
//           console.error(error);
//           return res.status(500).json("Server Error...");
//         }
//       });



//       router.put("/hates/:post_id", authentication, async (req, res) => {
//         try {
//           let post = await Post.findById(req.params.post_id);
      
//           if (!post) return res.status(404).json("Post not found");
      
//           if (post.hates.find((hate) => hate.user.toString() === req.user.id))
//             return res.status(401).json("Post is already hated by you!");
      
//           let newHate = {
//             user: req.user.id,
//           };
      
//           post.hates.unshift(newHate);
      
//           await post.save();
      
//           res.json(post);
//         } catch (error) {
//           console.error(error);
//           return res.status(500).json("Server Error...");
//         }
//       });


//       router.put("/add_comment/:post_id",
//         authentication,
//         [check("textOfTheComment", "Text is empty").not().isEmpty(),],
//         async (req, res) => {
//             try {
//               let post = await Post.findById(req.params.post_id);
//               let user = await User.findById(req.user.id).select("-password");
          
//               const { textOfTheComment } = req.body;
//               const errors = validationResult(req);
//               if (!errors.isEmpty())
//                 return res.status(400).json({ errors: errors.array() });
          
//               if (!user) return res.status(404).json("User not found");
          
//               if (!post) return res.status(404).json("Post not found");
          
//               let newComment = {
//                 textOfTheComment,
//                 name: user.name,
//                 avatar: user.avatar,
//               };
//               post.comments.unshift(newComment);
          
//               await post.save();
          
//               res.json("Comment is added");
//             } catch (error) {
//               console.error(error);
//               return res.status(500).json("Server Error...");
//             }
//           }
//       );


//       router.put("/hate_comment/:post_id/:comment_id", authentication, 
//       async (req, res) => {
//         try {
//           let post = await Post.findById(req.params.post_id);
      
//           if (!post) return res.status(404).json("Post not found!");
      
//           const commentFromPost = post.comments.find(
//             (comment) => comment._id.toString() === req.params.comment_id.toString()
//           );
      
//           if (!commentFromPost) return res.status(404).json("Comment not found");
      
//           let newHate = {
//             user: req.user.id,
//           };
      
//           commentFromPost.hates.unshift(newHate);
      
//           await post.save();
      
//           res.json("Comment is hated");
//         } catch (error) {
//           console.error(error);
//           return res.status(500).json("Server Error...");
//         }
//       });


//       router.delete("/delete_post/:post_id", authentication,
//       async (req, res) => {
//         try {
//           let post = await Post.findById(req.params.post_id);
      
//           if (!post) return res.status(404).json("Post not found");
      
//           if (post.user.toString() !== req.user.id.toString())
//             return res.status(401).json("You are not allowed to do that!");
      
//           await post.remove();
      
//           res.json("Post is removed!");
//         } catch (error) {
//           console.error(error);
//           return res.status(500).json("Server Error...");
//         }
//       });



//       router.delete("/remove_hate_from_post/:post_id/:hate_id", authentication, 
//       async (req, res) => {
//         try {
//           let post = await Post.findById(req.params.post_id);
      
//           if (!post) return res.status(404).json("Post not found");
      
//           const removeHateFromPost = post.hates.filter(
//             (hate) => hate.id.toString() !== req.params.hate_id.toString()
//           );
      
//           post.hates = removeHateFromPost;
      
//           await post.save();
      
//           res.json(post);
//         } catch (error) {
//           console.error(error);
//           return res.status(500).json("Server Error...");
//         }
//       }
//       );


//       router.delete("/remove_comment/:post_id/:comment_id", authentication,
//       async (req, res) => {
//         try {
//           let post = await Post.findById(req.params.post_id);
      
//           if (!post) return res.status(404).json("Post not found");
      
//           const removeCommentFromComments = post.comments.filter(
//             (comment) => comment._id.toString() !== req.params.comment_id
//           );
      
//           post.comments = removeCommentFromComments;
      
//           await post.save();
      
//           res.json(post);
//         } catch (error) {
//           console.error(error);
//           return res.status(500).json("Server Error...");
//         }
//       });



//       router.delete("/remove_hate_from_comment/:post_id/:comment_id/:hate_id", authentication,
//         async (req, res) => {
//             try {
//               let post = await Post.findById(req.params.post_id);
          
//               if (!post) return res.status(404).json("Post not found");
          
//               const comment = post.comments.find(
//                 (comment) => comment._id.toString() === req.params.comment_id.toString()
//               );
          
//               const removeHateFromComment = comment.hates.filter(
//                 (hate) => hate._id.toString() !== req.params.hate_id.toString()
//               );
          
//               comment.hates = removeHateFromComment;
          
//               await post.save();
          
//               res.json(post);
//             } catch (error) {
//               console.error(error);
//               return res.status(500).json("Server Error...");
//             }
//           });








//   module.exports = router;
