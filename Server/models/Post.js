import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    _id: {
        type: String,
        require: true,
        unique: true
    },
    userId: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userFirstName: {
        type: String,
        required: true
    },
    userLastName: {
        type: String,
        required: true
    },
    userLocation: String,
    text: String,
    mediaPath: String,
    mediaType: String,
    likes: {
        type: Map,
        of: Boolean
    },
    comments: {
        type: Array,
        default: []
    }
}, { timestamps: true, _id: false });

const Post = mongoose.model('Post', PostSchema);

export default Post;