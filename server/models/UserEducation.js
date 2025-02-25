import mongoose from "mongoose";

const userEducationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    institution: {
        type: String,
        required: true,
        trim: true
    },
    degree: {
        type: String,
        required: true,
        trim: true
    },
    fieldOfStudy: {
        type: String,
        required: true,
        trim: true
    },
    startYear: {
        type: Number,
        required: true
    },
    endYear: {
        type: Number,
        required: true
    }
},{
    timestamps: true
});

const UserEducation = mongoose.models.UserEducation || mongoose.model("UserEducation", userEducationSchema);
export default UserEducation;