import "./ChatroomsList.css"
import Chatroom from "./Chatroom"
import {useState,useEffect,useContext} from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import socket from "../tool/socket"
import { IDContext } from "../pages/Chat"

function ChatroomsList(props){
    const [chatroomsElem,setChatroomsElem] =  useState([])
    const {userID,currentRoomID,setCurrentRoomID} = useContext(IDContext)

    useEffect(()=>{
        socket.on("reload-room",()=>{fetchChatrooms()})
        return ()=>{
            socket.off("reload-room")
        }
    })
    const navigate = useNavigate()

    useEffect(()=>{fetchChatrooms()},[currentRoomID])

    const fetchChatrooms = async ()=>{
        try{
            const response = await axios(`http://localhost:3001/api/chatroom/${userID}`)
            const {chatrooms} = response.data
            const chatroomselem = chatrooms.map((chatroom)=>(
                <Chatroom 
                    click = {()=>{
                        socket.emit("leave",currentRoomID)
                        socket.emit("join",chatroom._id)
                        setCurrentRoomID(chatroom._id);
                    }} 
                    name =  {chatroom.chatroomName} 
                    key = {chatroom._id} 
                    selected = {chatroom._id===currentRoomID}
                />))
            setChatroomsElem(chatroomselem) 
        }
        catch(err){}
    }

    return (
        <>
            <div id="ChatroomsList">
                {chatroomsElem}
                <div id="ChatroomsList-toolbar-container">
                    <div id="ChatroomsList-toolbar">
                        <button onClick={()=>{navigate("/createRoom")}}>Create Room</button>
                        <button onClick={()=>{navigate("/addUser")}}>Add User</button>
                    </div>
                </div>
            </div>
            
        </>
        
    )
}
export default ChatroomsList