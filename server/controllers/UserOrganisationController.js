import User from "../models/User.js";
import UserFollowers from "../models/UserFollowers.js";
import UserFollowing from "../models/UserFollowing.js";

export const getOrganisations = async (req, res) => {
    try {
        const userFollowingOrganisations = await UserFollowing.findOne({user: req.user._id});
        const organisations = await User.find({isOrganisation: true, _id: {$nin: userFollowingOrganisations?.OrganisationsFollowing}});
        res.status(200).json({
            organisations
        });
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}

export const followOrganisation = async (req, res) => {
    try {
        const { userId } = req.body;
        console.log(userId);
        const organisationFollowers = await UserFollowers.findOne({user: userId});
        if(!organisationFollowers) {
            const newOrganisationFollowers = new UserFollowers({
                user: userId,
                followers: [req.user._id]
            });
            await newOrganisationFollowers.save();
        } else {
            organisationFollowers.followers.push(req.user._id);
            await organisationFollowers.save();
        }
        const userFollowingOrganisations = await UserFollowing.findOne({user: req.user._id});
        if(!userFollowingOrganisations) {
            const newUserFollowingOrganisations = new UserFollowing({
                user: req.user._id,
                following: [],
                OrganisationsFollowing: [userId]
            });
            await newUserFollowingOrganisations.save();
        } else {
            userFollowingOrganisations.OrganisationsFollowing.push(userId);
            await userFollowingOrganisations.save();
        }
        return res.status(200).json({
            message: "followed Organisation successfully.",
            userId
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

export const followingOrganisations = async (req, res) => {
    try {
        const userFollowingOrganisations = await UserFollowing.findOne({user: req.user._id});
        if(!userFollowingOrganisations) {
            return res.status(400).json({
                OrganisationsFollowing: []
            });
        }
        const organisations = await userFollowingOrganisations.populate("OrganisationsFollowing", "-password");
        return res.status(200).json({
            OrganisationsFollowing: organisations
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

export const unfollowOrganisation = async (req, res) => {
    try {
        const { userId } = req.body;
        const organisationFollowers = await UserFollowers.findOne({user: userId});
        organisationFollowers.followers = organisationFollowers?.followers?.filter((follower) => follower.toString() !== req.user._id.toString());
        await organisationFollowers.save();
        const userFollowingOrganisations = await UserFollowing.findOne({user: req.user._id});
        userFollowingOrganisations.OrganisationsFollowing = userFollowingOrganisations?.OrganisationsFollowing?.filter((organisation) => organisation.toString() !== userId.toString());
        await userFollowingOrganisations.save();
        return res.status(200).json({
            message: "unfollowed Organisation successfully.",
            userId
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}