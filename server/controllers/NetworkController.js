import UserFollowers from '../models/UserFollowers.js';
import UserFollowing from '../models/UserFollowing.js';
import User from '../models/User.js';

export const followers = async (req, res) => {
    try {
        const user = await UserFollowers.findOne({ user: req.user._id });
        if(!user) {
            await UserFollowers.create({ user: req.user._id, followers: [] });
            return res.status(204).json({
                message: "No followers yet",
                followers: []
            });
        }
        const userFollowers = await user.populate("followers", "userName email profileURL resumeURL about");
        return res.status(200).json({
            message: "Followers fetched successfully",
            followers: userFollowers
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

export const following = async (req, res) => {
    try {
        const user = await UserFollowing.findOne({ user: req.user._id });
        if(!user) {
            await UserFollowing.create({ user: req.user._id, following: [] });
            return res.status(204).json({
                message: "Not following anyone yet",
                following: []
            });
        }
        const userFollowing = await user.populate("following", "userName email profileURL resumeURL about");
        return res.status(200).json({
            message: "Following fetched successfully",
            following: userFollowing
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

export const unfollow = async (req, res) => {
    try {
        const user = await UserFollowing.findOne({ user: req.user._id });
        if(!user) {
            return res.status(204).json({
                message: "Not following anyone yet"
            });
        }
        const userIndex = user.following.indexOf(req.body.userId);
        if(userIndex === -1) {
            return res.status(400).json({
                message: "Not following this user"
            });
        }
        user.following.splice(userIndex, 1);    
        await user.save();
        return res.status(200).json({
            message: "Unfollowed successfully"
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

export const Explore = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");
        const following = await UserFollowing.findOne({ user: req.user._id });
        if(!following) {
            await UserFollowing.create({ user: req.user._id, following: [] });
        }
        const followingTo = following.following;
        let explore = users.filter(user => user._id.toString() !== req.user._id.toString() && !followingTo.includes(user._id.toString()) && user.isOrganisation === false);
        return res.status(200).json({
            message: "Users fetched successfully",
            explore
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

export const follow = async (req, res) => {
    try {
        const user = await UserFollowing.findOne({ user: req.user._id });
        if(!user) {
            await UserFollowing.create({ user: req.user._id, followers: [req.body.userId.toString()]});
        }
        if(user.following.includes(req.body.userId.toString())) {
            return res.status(400).json({
                message: "Already following this user"
            });
        }
        user.following.push(req.body.userId.toString());
        await user.save();
        
        const userFollowers = await UserFollowers.findOne({ user: req.body.userId });
        if(!userFollowers) {
            await UserFollowers.create({ user: req.body.userId, followers: [req.user._id]});
            return res.status(200).json({
                message: "Followed successfully",
                userId: req.body.userId
            })
        }
        userFollowers.followers.push(req.user._id);
        await userFollowers.save();
        return res.status(200).json({
            message: "Followed successfully",
            userId: req.body.userId
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    } 
}