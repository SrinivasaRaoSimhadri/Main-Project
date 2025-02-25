import mongoose from "mongoose";

const userSkillsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    skills: [{
        type: String,
        trim: true,
        unique: true
    }]
}, {
    timestamps: true
});

const UserSkills = mongoose.models.UserSkills || mongoose.model("UserSkills", userSkillsSchema);
export default UserSkills;