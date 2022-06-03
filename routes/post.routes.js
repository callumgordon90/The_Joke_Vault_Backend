const router = require('express').Router();
const postController = require('../controllers/post.controller');
const multer = require("multer");
const upload = multer();


//CRUD ENDPOINTS:

//Get a post:
router.get('/', postController.readPost);

//Create a post:
router.post('/', upload.single("file"), postController.createPost);

//Update a post:
router.put('/:id', postController.updatePost);

//Delete a post:
router.delete('/:id', postController.deletePost);

//Like a post:
router.patch('/like-post/:id', postController.likePost);

//Unlike a post:
router.patch('/unlike-post/:id', postController.unlikePost);



//COMMENTS:
//Comment on the post of another user:
router.patch('/comment-post/:id', postController.commentPost);
//Edit the comment on a post:
router.patch('/edit-comment-post/:id', postController.editCommentPost);
//Delete the comment on a post:
router.patch('/delete-comment-post/:id', postController.deleteCommentPost);



module.exports = router;
