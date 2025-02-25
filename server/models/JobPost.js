import mongoose from "mongoose";
const JobPostSchema = new mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    role: {
        type: String,
        required: true,
        min: 5,
        max: 50
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    isOpen: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const JobPost = mongoose.models.JobPost || mongoose.model("JobPost", JobPostSchema);
export default JobPost;