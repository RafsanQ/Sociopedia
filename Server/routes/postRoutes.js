import express from 'express';
import { createPost, getFeedPosts, getUserPosts, likePost, sendComment, deleteComment } from '../controllers/postControllers.js';

import { varifyToken } from "../middleware/auth.js";

const router = express.Router();

// Read
router.get("/:skip", varifyToken, getFeedPosts);
router.get("/:userId/posts/:skip", varifyToken, getUserPosts);

//Post
router.post('/create', varifyToken, createPost);

// Update
router.patch("/:id/like", varifyToken, likePost);
router.patch("/:id/comment", varifyToken, sendComment);

router.patch("/:id/comment/:commentId/delete", varifyToken, deleteComment);

export default router;