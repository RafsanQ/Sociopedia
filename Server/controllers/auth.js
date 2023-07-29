import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"
import fs from 'fs/promises';
import path from 'path';


const writeFile = async (fileName, content) => {
    let base64Image = content.split(';base64,').pop();
    try{
        await fs.writeFile(fileName, base64Image, {encoding: 'base64'});
    }catch(e){
        console.error(e);
    }
}
//     fs.writeFileSync(filePath, base64Image, err => {
//         if (err) console.log('File not written', err);
//         else console.log('File written');
//     });
// }

// Register User
export const register = async (req, res) => {
    try{
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

        console.log({
            firstName, 
            lastName,
            email,
            password,
            picturePath,
            picture,
            friends,
            location,
            occupation
        });

        // Store the picture on to the disk
        const pictureName = 'newPicture.png';
        
        writeFile(pictureName, picture);
        
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
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // Create the token and store it in the .env file
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        // Password should not be sent to the front end
        delete user.password;

        res.status(200).json({ token, user });

    }catch(error){
        res.status(500).json({ error: error.message });
    }
}