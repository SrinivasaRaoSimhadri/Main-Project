import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http"; 


import ConnectDB from "./config/ConnectDB.js";
import Authenticate from "./utils/userAuth.js";
import initializeSocket from "./utils/socket.js";

import AuthRouter from "./routes/AuthRouter.js";
import ProfileRouter from "./routes/ProfileRouter.js";
import ExperienceRouter from "./routes/ExperienceRouter.js";
import NetworkRouter from "./routes/NetworkRouter.js";
import OrganisationRouter from "./routes/OrganisationRouter.js";
import userOrganisation  from  "./routes/UserOrganisation.js";
import UserJobRouter from "./routes/UserJobRouter.js";
import ChatRouter from "./routes/ChatRouter.js";

const app = express();


app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true
}));


dotenv.config();
app.use(express.json());

app.use("/auth", AuthRouter);
app.use("/profile", Authenticate, ProfileRouter);
app.use("/experience", Authenticate, ExperienceRouter);
app.use("/userNetwork", Authenticate, NetworkRouter);
app.use("/organisation", Authenticate, OrganisationRouter);
app.use("/userOrganisation", Authenticate, userOrganisation);
app.use("/userJobs", Authenticate, UserJobRouter);
app.use("/chat", Authenticate, ChatRouter);

const server = http.createServer(app);
initializeSocket(server);

const Start = async () => {
    try {
        await ConnectDB();
        server.listen(process.env.PORT, () => {
            console.log("App is listening to port: ", process.env.PORT);
        })
    } catch {
        console.log("Error in connecting to database.");
    }
};

Start();