import { writeFile, moveFile, getStorageFormate } from "./fileInputOutput.js";

import Post from "../models/Post.js";
import User from "../models/User.js";

import crypto from 'crypto';



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
            firstName: user.firstName,
            lastName: user.location,
            location: user.location,
            text,
            mediaPath,
            likes: {},
            comments: []
        })
        await newPost.save();

        // Store the media data
        if(media){
            await writeFile(fileName, media);
            moveFile(fileName, mediaPath);
        }
        

        const post = await Post.find();
        res.status(201).json(post);
    }catch(error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Read
export const getFeedPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    }catch(error) {
        res.status(409).json({ message: error.message });
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await Post.find( { userId } );
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
        res.status(404).json({ message: error.message });
    }
}
