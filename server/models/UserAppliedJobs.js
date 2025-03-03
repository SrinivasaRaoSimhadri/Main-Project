import mongoose from "mongoose";
const UserAppliedJobsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    jobApplied: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "JobPost"
    },
    status: {
        type: String,
        enum: ["Not Applied","Applied", "Accepted", "Rejected"],
        default: "Not Applied",
        required: true
    },
    marks: {
        type: Number
    },
    scored: {
        type: Number
    },
    cutOff: {
        type: Number
    }
},{
    timestamps: true
})
const UserAppliedJobs = mongoose.models.UserAppliedJobs || mongoose.model("UserAppliedJobs", UserAppliedJobsSchema);
export default UserAppliedJobs;