import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        min: 4,
        max: 50,
        trim: true,
        required: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                return validator.isEmail(value);
            },
            message: "Enter valid email address."
        }
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 20
    },
    profileURL: {
        type: String,
        default: "https://images.hindustantimes.com/img/2024/07/26/550x309/Sundeep_Kishan_restaurant_reaction_1721983979667_1721984007571.jpg"
    },
    resumeURL: {
        type: String
    },
    about: {
        type: String,
        default: "Hey there! I am using Job Portal.",
        max: 50
    },
    isOrganisation: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

UserSchema.methods.isValidPassword = async function(userInputPassword) {
    const user = this;
    return await bcrypt.compare(userInputPassword, user.password);
}

UserSchema.methods.get_JWT = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});
    return token;
}

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;