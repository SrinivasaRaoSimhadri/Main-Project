import User from "../models/User.js";

export const updateAbout = async (req, res) => {
    try {
        const { about } = req.body;
        const user = await User.findById(req.user._id);
        user.about = about;
        await user.save();
        return res.status(200).json({ message: "About updated successfully" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Internal Server Error" });
    }
}

export const updateImage = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.profileURL = req.body.destinationPath;
        await user.save();
        return res.status(200).json({ message: "Image uploaded successfully" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Internal Server Error" });
    }
}