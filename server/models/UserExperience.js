import mongoose from "mongoose";

const userExperienceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    company: {
        type: String,
        required: true,
        trim: true
    },
    jobTitle: {
        type: String,
        required: true,
        trim: true
    },
    startDate: {
        type: String,
        required: true,
        trim: true
    },
    endDate: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

const UserExperience = mongoose.models.Experience || mongoose.model("UserExperience", userExperienceSchema);
export default UserExperience;