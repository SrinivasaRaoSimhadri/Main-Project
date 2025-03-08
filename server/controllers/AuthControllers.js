import bcrypt from "bcrypt";
import { ValidateLoginData, validateSignUpData } from "../utils/validation.js";
import User from "../models/User.js"

export const Login = async (req, res) => {
   try {
        ValidateLoginData(req);
        const { email, password } = req.body;

        const isExistingUser = await User.findOne({email});
        if(!isExistingUser) {
            return res.status(400).json({
                "message": "Invalid credintials"
            })
        }

        const isPasswordValid = await isExistingUser.isValidPassword(password);
        if(!isPasswordValid) {
            return res.status(400).json({
                "message": "Invalid credintials"
            })
        }

        const token = await isExistingUser.get_JWT();
        return res.status(200).json({
            "message": "Loggedin successfully",
            "data": {email, token, isOrganisation: isExistingUser.isOrganisation, _id: isExistingUser._id, profileURL: isExistingUser.profileURL}
        })
   } catch (error) {
        return res.status(400).json({
            "message": error.message
        })
   }
}

export const RegisterUser = async (req, res) => {
    try {
        validateSignUpData(req);
        const { userName, email, password, isOrganisation } = req.body;
        const isExistingUser = await User.findOne({email});
        if(isExistingUser) {
            return res.status(400).json({
                "message": "Email already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            email,
            userName, 
            password: hashedPassword,
            isOrganisation: isOrganisation || false
        })
        await user.save();
        return res.status(200).json({
            "message": "Signedup successfully"
        })
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        })
    }
}