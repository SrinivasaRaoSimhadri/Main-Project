import JobPost from '../models/JobPost.js';
import { validatePostJob } from '../utils/validation.js';

export const postJob = async (req, res) => {
    try {
        validatePostJob(req);
        const { role, description, location, salary, jobType, skills, questions, cutoffMarks } = req.body;
        const jobPost = new JobPost({
            postedBy: req.user._id,
            role,
            description,
            location,
            salary,
            jobType,
            skills,
            questions,
            cutoffMarks
        });
        await jobPost.save();
        return res.status(200).json({
            message: "Job posted successfully."
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

export const getJobs = async (req, res) => {
    try {
        const jobs = await JobPost.find({postedBy: req.user._id, isOpen: true}).populate('postedBy', 'userName email profileURL about');
        return res.status(200).json({
            "message": "Jobs fetched successfully.",
            jobs
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

export const closeApplication = async (req, res) => {
    try {
        const { jobId } = req.body;
        const data = await JobPost.findByIdAndUpdate(jobId, {isOpen: false}, {new: true});
        res.status(200).json({
            message: "Application closed successfully"
        });
    } catch (error) {
        res.status(400).json({ 
            message: error.message 
        });  
    }
}

export const hirings = async (req, res) => {
    try {
        const jobs = await JobPost.find({postedBy: req.user._id, isOpen: false, closeHiring: false}).populate('postedBy', '-password').populate('applications', '-password');
        return res.status(200).json({
            jobs
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

export const closeHiring = async (req, res) => {
    try {
        console.log("Hiring closed");
        console.log(req.body);
        const { jobId } = req.body;
        const data = await JobPost.findByIdAndUpdate(jobId, {closeHiring: true}, {new: true});
        console.log(data);
        res.status(200).json({
            message: "Hiring closed successfully"
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

export const getDashBoard = async (req, res) => {
    try {
        const jobs = await JobPost.find({postedBy: req.user._id});
        return res.status(200).json({
            jobs
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}