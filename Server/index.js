import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { error } from 'console';
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

import { register } from './controllers/auth.js';
import { createPost } from './controllers/postControllers.js';

import { varifyToken } from './middleware/auth.js'

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'})); 
app.use(morgan("common"));
app.use(bodyParser.json({limit: "1024mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "1024mb", extended: true}));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));


// // /* FILE STORAGE */
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/assets');
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     }
// });
// const upload = multer({storage});


/* Routes with files */
// app.post("/auth/register", upload.single("picture"), register);
// app.post("/posts/", varifyToken, upload.single("picture"), createPost);

/* Routes */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* Mongoose */
const PORT = process.env.PORT || 6001;
try{
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        app.listen(PORT, () => {
            console.log(`server listening on port ${PORT}`);
        })
    }).catch((error) => console.log(error));
} catch(error){
    console.log(error);
}
