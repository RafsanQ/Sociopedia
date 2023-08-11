import bcrypt from "bcrypt";
import User from "../models/User.js"


import { writeFile, moveFile } from "./fileInputOutput.js";

export const getUser = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    }catch(error){
        res.status(404).json({message: error.message});
    }
}

export const getUserFriends = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, email, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, email, occupation, location, picturePath };
            }
        );
        res.status(200).json(formattedFriends);
    }catch(error){
        res.status(404).json({message: error.message});
    }
}

export const addRemoveFriend = async (req, res) => {
    try{
        const { id, friendId } = req.params;
        const user = await User.findById(id);

        if(!user){
            res.status(400).json({message:'user not found'});
            return;
        }

        const friend = await User.findById(friendId);
        if(!friend){
            res.status(400).json({message:'target user not found'});
            return;
        }

        
        
        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id)
        }
        else{
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        await user.save();
        await friend.save();
        
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );

        res.status(200).json(formattedFriends);
    }catch(error){
        res.status(501).json({message: error.message});
    }
}

export const changeAccountsettings = async (req, res) => {
    let {
        userId,
        firstName, 
        lastName,
        password,
        picturePath,
        picture,
        friends,
        location,
        occupation
    } = req.body;
    
    
    
    // If email already Registered
    let user = await User.findOne({ _id: userId });
    if (!user) return res.status(400).send("User does not exist")
    console.log({user});
    

    try{
        user = await User.findByIdAndUpdate(userId, {
            firstName, 
            lastName,
            location,
            occupation},
            {new: true}
        );

        if(password){
            // Encrypt the password with salt
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);

            user = await User.findByIdAndUpdate(userId, {password: passwordHash}, {new: true});
        }

        if(picture){
            // Picture Name and path
            const pictureName = user.email + '.png';
            picturePath = 'public/assets/profilepictures/' + pictureName;

            console.log({picturePath, pictureName});

            await writeFile(pictureName, picture);
            moveFile(pictureName, picturePath);
        }

        res.status(201).json(user);
    }catch(error){
        res.status(500).json({ error: error.message });
    }
}
