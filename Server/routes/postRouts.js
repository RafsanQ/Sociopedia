import express from 'express';
import { getFeedPosts, getUserPosts, likePost } from '../controllers/postControllers.js';

import { varifyToken } from "../middleware/auth.js";


const router = express.Router();

// Read
router.get("/", varifyToken, getFeedPosts);
router.get("/:userId/posts", varifyToken, getUserPosts);

// Update
router.patch("/:id/like", varifyToken, likePost);