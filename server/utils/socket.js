import {Server} from 'socket.io';
import Message from "../models/Message.js";

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*"
        }
    })
    io.on("connection",  (socket) => {

        socket.on("joinGroupChat", ({groupId}) => {
            socket.join(groupId);
        });

        socket.on("groupMessage", async ({loggedUserId, groupId, message}) => {
            console.log({loggedUserId, groupId, message});
            try {
                const groupchat = await Message.findById(groupId);
                groupchat?.messages.push({
                    sender: loggedUserId,
                    message: message
                });
                await groupchat.save();
                io.to(groupId).emit("receiveGroupMessage", {loggedUserId, message});
            } catch (error) {
                console.log(error);
            }
        });

        socket.on("joinChat", ({loggedUserId, targetUserId}) => {
            const room = [loggedUserId, targetUserId].sort().join("_");
            socket.join(room);
        });

        socket.on("message", async ({loggedUserId, targetUserId, message}) => {
            console.log({loggedUserId, targetUserId, message});
            const room = [loggedUserId, targetUserId].sort().join("_");
            try {
                const privatechat = await Message.findOne({
                    type: "private",
                    participants: {
                        $all: [loggedUserId, targetUserId]
                    }
                });
                if(!privatechat) {
                    const newChat = new Message({
                        type: "private",
                        participants: [loggedUserId, targetUserId],
                        messages: [
                            {
                                sender: loggedUserId,
                                message: message
                            }
                        ]
                    });
                    await newChat.save();
                    io.to(room).emit("receiveMessage", {loggedUserId, message});
                    return;
                }
                privatechat.messages.push({
                    sender: loggedUserId,
                    message: message
                });
                await privatechat.save();
                io.to(room).emit("receiveMessage", {loggedUserId, message});
            } catch (error) {
                console.log(error);
            }
        });

    })
}

export default initializeSocket;