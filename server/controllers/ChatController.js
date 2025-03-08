import Chat from "../models/Message.js";

export const getPrivateMessages = async (req, res) => {
    const {loggedUserId, targetUserId} = req.body;
    try {
        const messages = await Chat.findOne({
            type: "private",
            participants: {
                $all: [loggedUserId, targetUserId]
            }
        });
        if(!messages) {
            return res.status(200).json({
                messages: []
            });
        }
        return res.status(200).json({
            messages: messages.messages
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Internal server error"
        });
    }
}

export const getYourGroups = async (req, res) => {
    try {
        const groups = await Chat.find({
            type: "group",
            admin: req.user._id
        }).populate("admin", "-password");;
        if(!groups) {
            return res.status(200).json({
                groups: []
            });
        }
        return res.status(200).json({
            groups
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Internal server error"
        });
    }
}

export const getLearnGroups = async (req, res) => {
    try {
        const groups = await Chat.find({
            type: "group",
            admin: {$ne: req.user._id}
        }).populate("admin", "-password");
        if(!groups) {
            return res.status(200).json({
                groups: []
            });
        }
        return res.status(200).json({
            groups
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Internal server error"
        });
    }
}

export const createGroup = async (req, res) => {
    try {
        const {groupName} = req.body;
        const group = new Chat({
            type: "group",
            groupName,
            admin: req.user._id
        });
        await group.save();
        res.status(200).json({
            message: "Group created successfully"
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Internal server error"
        });
    }
}


export const getGroupMessages = async (req, res) => {
    const {groupId} = req.body;
    try {
        const messages = await Chat.findById(groupId);
        if(!messages) {
            return res.status(200).json({
                messages: []
            });
        }
        return res.status(200).json({
            messages: messages.messages
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Internal server error"
        });
    }
}