import jwt from "jsonwebtoken";
import User from "../models/User.js";

const Authenticate = async (req, res, next) => {
    try {
        const autherHead = req.headers.authorization;
        if(!autherHead) {
            return res.status(401).json({"message": "Unauthorized"});
        }
        const token = autherHead.split(" ")[1];
        if(!token) {
            return res.status(401).json({"message": "Unauthorized"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { _id } = decoded;    
        const user = await User.findById(_id).select("-password");
        if(!user) {
            return res.status(401).json({"message": "Unauthorized"});
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({"message": "Unauthorized"});
    }
}

export default Authenticate;