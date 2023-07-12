import express from "express";

import {
    getUser,
    getUserFriends,
    addRemoveFriend
} from "../controllers/userControllers.js";

import { varifyToken } from "../middleware/auth.js";

const router = express.Router();

// Read Routes
router.get("/:id", varifyToken, getUser);
router.get("/:id/friends", varifyToken, getUserFriends);

// Update Routes
router.patch("/:id/:friendId", varifyToken, addRemoveFriend);

export default router;