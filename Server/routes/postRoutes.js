import express from 'express';
import { createPost, getFeedPosts, getUserPosts, likePost, sendComment } from '../controllers/postControllers.js';

import { varifyToken } from "../middleware/auth.js";

const router = express.Router();

// Read
router.get("/", varifyToken, getFeedPosts);
router.get("/:userId/posts", varifyToken, getUserPosts);

//Post
router.post('/create', varifyToken, createPost);

// Update
router.patch("/:id/like", varifyToken, likePost);
router.patch("/:id/comment", varifyToken, sendComment);

export default router;