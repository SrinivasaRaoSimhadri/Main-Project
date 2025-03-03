import UserAppliedJobs from "../models/UserAppliedJobs.js";
import JobPost from "../models/JobPost.js";

export const getUserAppliedJobs = async (req, res) => {
    try {
        const userAppliesJobs = await UserAppliedJobs.find({ user: req.user._id }).populate({
            path: "jobApplied",
            populate: {
                path: "postedBy",
                select: "-password"
            }
        });
        res.status(200).json({
            userAppliesJobs
        });
    } catch (error) {
        res.status(404).json({ 
            message: error.message 
        });  
    }    
}

export const getExploreJobs = async (req, res) => {
    try {
        const userAppliedJobs  = await UserAppliedJobs.find({ user: req.user._id });
        const userAppliedJobIds = userAppliedJobs.map((job) => job.jobApplied);
        const exploreJobs = await JobPost.find({_id: {$nin: userAppliedJobIds}, isOpen: true}).populate("postedBy", "-password");
        return res.status(200).json({
            exploreJobs
        });
    } catch (error) {
        res.status(404).json({ 
            message: error.message 
        });  
    }   
}

export const getExamData = async (req, res) => {
    try {
        const { jobPostId } = req.body;
        const jobPost = await JobPost.findById(jobPostId).populate("postedBy", "-password");
        res.status(200).json({
            jobPost
        });
    } catch (error) {
        res.status(404).json({ 
            message: error.message 
        });  
    }
}

export const Apply = async (req, res) => {
    try {
        const {jobPostId, status, marks, scored, cutOff} = req.body;
        const userAppliedJob = new UserAppliedJobs({
            user: req.user._id,
            jobApplied: jobPostId,
            status,
            marks,
            scored,
            cutOff
        });
        await userAppliedJob.save();
        res.status(200).json({
            message: "Applied successfully."
        });
    } catch (error) {
        res.status(400).json({ 
            message: error.message 
        });  
    }
}