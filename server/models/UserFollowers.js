import mongoose from 'mongoose'

const UserFollowersSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    followers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    }
},{
    timestamps: true
});

const UserFollowers = mongoose.models.UserFollowers || mongoose.model('UserFollowers', UserFollowersSchema);
export default UserFollowers;