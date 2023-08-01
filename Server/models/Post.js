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
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    location: String,
    text: String,
    mediaPath: String,
    userPicturePath: String,
    likes: {
        type: Map,
        of: Boolean
    },
    comment: {
        type: Array,
        default: []
    }
}, { Timestamp: true, _id: false });

const Post = mongoose.model('Post', PostSchema);

export default Post;