import UserExperience from "../models/UserExperience.js";
import UserSkills from "../models/UserSkills.js";
import UserEducation from "../models/UserEducation.js";
import { validateAddEducationDetails, validateAddExperienceDetails, validateSkillDetails } from "../utils/validation.js";


export const getProfile = async (req, res) => {
    try {
        const user = req.user;
        const  [userEducation, userExperience, userSkills] = await Promise.all([
            UserEducation.find({user: user._id}),
            UserExperience.find({user: user._id}),
            UserSkills.find({user: user._id})
        ]);
        return res.status(200).json({
            "message": "Profile fetched successfully",
            "data": {
                user,
                userEducation,
                userExperience,
                userSkills
            }
        })
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        });
    }
}

export const postDetails = async (req, res) => {
    try {
        console.log(req.params.info === "AddEducationDetails");
        if(req.params.info === "AddEducationDetails") {
            validateAddEducationDetails(req);
            const { institution, degree, fieldOfStudy, startYear, endYear } = req.body;
            console.log({ institution, degree, fieldOfStudy, startYear, endYear });
            const userEducation = new UserEducation({
                user: req.user._id,
                institution,
                degree,
                fieldOfStudy,
                startYear,
                endYear
            });
            console.log(userEducation);
            await userEducation.save();
            return res.status(200).json({
                "Success": "Education details added successfully"
            });
        } else if(req.params.info === "AddExperienceDetails") {
            validateAddExperienceDetails(req);
            const { company, jobTitle, startDate, endDate } = req.body;
            const userExperience = new UserExperience({
                user: req.user._id,
                company,
                jobTitle,
                startDate,
                endDate
            });
            await userExperience.save();
            return res.status(200).json({
                "Success": "Experience details added successfully"
            });
        } else if(req.params.info === "AddSkillDetails") {
            validateSkillDetails(req);
            console.log(req.body);
            const { skill } = req.body;
            const userskill = await UserSkills.findOne({user: req.user._id});
            if(!userskill) {
                const newSkills = new UserSkills({
                    user: req.user._id,
                    skills: [skill]
                })
                await newSkills.save();
            } else {
                if(userskill.skills.includes(skill)) {
                    return res.status(400).json({
                        "Error": "Something went wrong!"
                    });
                }
                userskill.skills.push(skill);
                await userskill.save();
            }
            return res.status(200).json({
                "Success": "added successfully"
            });            
        }
    } catch (error) {
        return res.status(400).json({
            "Error": error.message
        });
    }
}

export const getDetails = async (req, res) => {
    try {
        if(req.params.path === "GetEducationDetails") {
            const userEducation = await UserEducation.find({user: req.user._id}).sort({createdAt: -1});
            return res.status(200).json({
                userEducation
            });
        } else if(req.params.path === "GetExperienceDetails") {
            const userExperience = await UserExperience.find({user: req.user._id}).sort({createdAt: -1});;
            return res.status(200).json({
                userExperience
            });
        } else if(req.params.path === "GetSkillsDetails") {
            const userSkills = await UserSkills.findOne({user: req.user._id});
            return res.status(200).json({
                userSkills
            });
        }
    } catch (error) {
        return res.status(400).json({
            "Error": error.message
        });
    }
}