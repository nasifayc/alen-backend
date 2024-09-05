import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import adminRoutes from "./routes/admin.routes.js";
import clientRoutes from "./routes/client.routes.js";
import institutionRoutes from "./routes/institution.routes.js";
import professionRoutes from "./routes/profession.routes.js";
import authRoutes from './routes/auth.routes.js';
import eventRoutes from "./routes/event.routes.js";
import awarenessRoutes from './routes/awareness.routes.js';
import chatbotRoutes from './routes/chat.routes.js';
import realtimechatRoutes from './routes/realtimechat.routes.js';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import socketHandler from './socketHandler.js';


const mongoUri = process.env.MONGO_URL;
const port = process.env.port || 3001;

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin: "*",
        methods: ["GET", "POST"]
        
    },
});
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log("MongoDB Connected"))
.catch((err)=>console.log(err));

app.use(bodyParser.json());
app.use("/api/admins", adminRoutes);
app.use("/api/institutions", institutionRoutes);
app.use("/api/professions", professionRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/awarenesses", awarenessRoutes);
app.use("/api/chat",chatbotRoutes);
app.use("/api/realtimechat",realtimechatRoutes);

// var clients = {};
// io.on("connection", (socket)=>{
//     console.log(`User Connected: ${socket.id}`);


//     socket.on("join_room", (data)=>{
//         socket.join(data);
//         console.log(`User with ID: ${socket.id} joined room: ${data}`)
//     })
//     socket.on("send_message", (data) => {
//         socket.to(data.room).emit("receive_message", data);
//       });    
//     socket.on("disconnect", ()=>{
//         console.log("user disconnected",socket.id);
//     })
//     socket.on("test",(id)=>{
//         console.log(id);
//         clients[id]=socket;
//         console.log(clients);
//     })
//     socket.on("sendMessage",(msg)=>{
//         console.log(msg);
//     })
// });
socketHandler(io);

server.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});