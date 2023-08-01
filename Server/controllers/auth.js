import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"

import { writeFile, moveFile } from "./fileInputOutput.js";



// Register User
export const register = async (req, res) => {

    let {
        firstName, 
        lastName,
        email,
        password,
        picturePath,
        picture,
        friends,
        location,
        occupation
    } = req.body;


    // If email already Registered
    let user = await User.findOne({ email: email });
    if (user) return res.status(400).send("Email already exists")


    // Picture Name and path
    const pictureName = email + '.png';
    picturePath = 'public/assets/profilepictures/' + pictureName;

    try{
        
        // Encrypt the password with salt
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // Create new user that will be stored
        const newUser = new User({
            firstName, 
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000)
        });

        const savedUser = await newUser.save();

        // Store the picture on to the disk
        
        await writeFile(pictureName, picture);
        moveFile(pictureName, picturePath);

        res.status(201).json(savedUser);
    }catch(error){
        res.status(500).json({ error: error.message });
    }
}

// Login User
export const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({ email: email });
        
        if(!user){
            return res.status(401).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(402).json({ message: 'Invalid Password' });
        }

        // Create the token and store it in the .env file
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        // Password should not be sent to the front end
        delete user.password;

        res.status(200).json({ token, user });

    }catch(error){
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}