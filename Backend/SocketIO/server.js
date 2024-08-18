import {Server} from "socket.io";
import http from "http";
import express from "express";

const app = express()

const server = http.createServer(app);
const io=new Server(server,{
    cors: {
        origin: 'https://texxapp.netlify.app/api',
        // origin: "https://chat-karo-phi.vercel.app",
        // origin:"http://localhost:5173" ,
        // origin: "https://texxtkaro.netlify.app/login",
        methods: ["GET", "POST"],
        
    },
});

//realtime message code goes here
export const getReceiverSocketId = (receiverId) => {
    return users[receiverId];
  };

const users={}

//used to listen events on server side
io.on("connection",(socket)=>{
    console.log("a user connected",socket.id);
    const userId = socket.handshake.query.userId;
    if(userId){
        users[userId]=socket.id;
        console.log("Hello",users);
    }
    //used to send events to all connected users
    io.emit("getOnlineUsers",Object.keys(users));

    //used to listen client side events on server side(server side and client side)
    socket.on("disconnect",()=>{
    console.log("a user disconnected",socket.id);
    delete users[userId];
    io.emit("getOnlineUsers", Object.keys(users));
    })
})

export {app,io,server};