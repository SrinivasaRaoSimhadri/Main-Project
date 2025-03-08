import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["private", "group"], 
        required: true
    },
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    groupName: {
        type: String,
        trim: true,
        default: null 
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null 
    },
    messages: [
        {
            sender: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            message: {
                type: String,
                required: true
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, { 
    timestamps: true 
});

const Chat = mongoose.models.Chat  || mongoose.model("Chat", chatSchema);
export default Chat;
