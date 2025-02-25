import InterviewExperience from "../models/ExperiencePost.js";
import { validatePostExperience } from "../utils/validation.js";

export const postExperience = async (req, res) => {
    try {
        validatePostExperience(req);
        const  { company, role, hiringMode, roundsDescription, difficulty, offerStatus } = req.body;
        const newExperience = new InterviewExperience({
            user: req.user._id,
            company,
            role,
            hiringMode,
            roundsDescription,
            difficulty,
            offerStatus
        });
        await newExperience.save();
        return res.status(200).json({
            "message": "Experience posted successfully."
        });
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        });
    }
}

export const deleteExperience = async (req, res) => {
    try {
        const id = req.params.id;
        const experiencePost = await InterviewExperience.findByIdAndDelete(id);
        if(experiencePost) {
            return res.status(200).json({
                "message": "Deleted successfully!"
            })
        }
        return res.status(400).json({
            "message": "Experience not found."
        });
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        });
    }
}

export const getLoggedUserPosts = async (req, res) => {
    try {
        const _id = req.user._id;
        const loggedUserPosts = await InterviewExperience.find({user: _id}).populate("user", "_id userName email profileURL");
        return res.status(200).json({
            "experiencePosts": loggedUserPosts
        });
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        });
    }
};

export const AllExperiencePosts = async (req, res) => {
    try {
        const experiencePosts = await InterviewExperience.find({}).populate("user", "_id userName email profileURL");
        return res.status(200).json({
            "experiencePosts": experiencePosts
        });
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        });
    }
}