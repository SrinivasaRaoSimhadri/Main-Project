import mongoose from "mongoose";

const UserFollowingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    following: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    },
    OrganisationsFollowing: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    }
},{
    timestamps: true
})

const UserFollowing = mongoose.models.UserFollowing || mongoose.model("UserFollowing", UserFollowingSchema);
export default UserFollowing;