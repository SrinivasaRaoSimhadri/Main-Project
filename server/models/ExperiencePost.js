import mongoose from "mongoose";
const interviewExperienceSchema = new mongoose.Schema({
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
    role: {
        type: String,
        required: true,
        trim: true
    },
    hiringMode: {
        type: String,
        enum: ["On-Campus", "Off-Campus", "Virtual"],
        required: true,
    },
    roundsDescription: {
        type: String,
        required: true,
        trim: true
    },
    difficulty: {
        type: String,
        enum: ["Easy", "Easy-Medium", "Medium", "Medium-Hard", "Hard"],
        required: true
    }, 
    offerStatus: {
        type: String, 
        enum: ["Accepted", "Rejected"],
        required: true
    },
    upVote: {
        type: Number,
        default: 0
    },
    downVote: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const InterviewExperience = mongoose.models.InterviewExperience || mongoose.model("InterviewExperience", interviewExperienceSchema);
export default InterviewExperience;