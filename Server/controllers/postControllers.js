import { writeFile, moveFile, getStorageFormate } from "./fileInputOutput.js";

import Post from "../models/Post.js";
import User from "../models/User.js";

import crypto from 'crypto';
import { Timestamp } from 'mongodb';



// Create
export const createPost = async (req, res) => {
    try{
        const { userId, text, media } = req.body;

        const user = await User.findById(userId);

        // Randomly generated string
        const _id = crypto.randomBytes(32).toString('hex');

        // Get Media type from the media object
        let mediaType = '';
        let fileName = '';
        let mediaPath = '';
        if(media) {
            mediaType = media.split(';base64,').shift();

            mediaType = mediaType.replace('data:', '').split('/').shift();

            fileName = _id + getStorageFormate(mediaType);
            mediaPath = 'public/assets/posts/' + mediaType + '/' + fileName;
        }
        
        const newPost = new Post({
            _id,
            userId, 
            userEmail: user.email,
            userFirstName: user.firstName,
            userLastName: user.lastName,
            userLocation: user.location,
            text,
            mediaPath,
            mediaType,
            likes: {},
            comments: []
        });


        // Store the media data
        if(media){
            await writeFile(fileName, media);
            moveFile(fileName, mediaPath);
            console.log("File Written successfully");
        }

        await newPost.save();
        
        const post = await Post.find();
        res.status(201).json(post);
    }catch(error) {
        console.log("Try Catcht Error");
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Read
export const getFeedPosts = async (req, res) => {
    try {
        const { skip } = req.params;
        const posts = await Post.find().sort({ createdAt: -1 }).skip(skip);
        res.status(200).json(posts);
    }catch(error) {
        res.status(409).json({ message: error.message });
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId, skip } = req.params;
        const posts = await Post.find( { userId } ).sort({ createdAt: -1 });
        res.status(200).json(posts);
    }catch(error) {
        res.status(404).json({ message: error.message });
    }
}


// Update
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);

        const isLiked = post.likes.get(userId);
        if(isLiked) {
            post.likes.delete(userId);
        }
        else{
            post.likes.set(userId, true);
        }
        const updatedPost = await Post.findByIdAndUpdate(id, {likes: post.likes}, {new: true});
        res.status(200).json(updatedPost);
    }catch(error) {
        res.status(500).json({ message: error.message });
    }
}

export const sendComment = async (req, res) => {
    try{
        const id = req.params.id;
        const { userId, text } = req.body;

        const user = await User.findById(userId);
        const post = await Post.findById(id);

        if(!post){
            res.status(404).json({ message: 'Post does not exist' });
            return;
        }

        const commentId = crypto.randomBytes(32).toString('hex');
        const timestamp = new Date().toString();

        post.comments.unshift({ _id: commentId, userId, userEmail: user.email, text, updated: timestamp });

        const updatedPost = await Post.findByIdAndUpdate(id, {comments: post.comments});

        res.status(200).json({ _id: commentId, userId, userEmail: user.email, text, updated: timestamp });

    }catch(error) {
        res.status(500).json({ message: error.message });
    }
} 

export const deleteComment = async (req, res) => {
    try{
        const { id, commentId } = req.params;
        

        // const user = await User.findById(userId);
    
        const post = await Post.findById(id);

        if(!post){
            res.status(404).json({ message: 'Post does not exist' });
            return;
        }

        console.log({post});
        console.log({commentId});
        post.comments = post.comments.filter(
            comment => comment._id != commentId
        )

        const updatedPost = await Post.findByIdAndUpdate(id, {comments: post.comments});

        res.status(200).json("Comment Deleted");

    }catch(error) {
        res.status(500).json({ message: error.message });
    }
}
