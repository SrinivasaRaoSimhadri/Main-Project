import JobPost from '../models/JobPost.js';
import { validatePostJob } from '../utils/validation.js';

export const postJob = async (req, res) => {
    try {
        validatePostJob(req);
        const { role, description, location, salary, jobType, skills } = req.body;
        const jobPost = new JobPost({
            postedBy: req.user._id,
            role,
            description,
            location,
            salary,
            jobType,
            skills
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