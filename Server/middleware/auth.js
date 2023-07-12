import { Jwt } from "jsonwebtoken";

export const varifyToken = async (req, res, next) => {
    try{
        let token = req.header("Authorization");

        if(!token){
            return res.status(403).send("Access Denied");
        }

        // Remove Bearer if it exists in the header
        if(token.startswith("Bearer ")){
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    }catch(error){
        res.status(404).json({ error: error.message });
    }

}