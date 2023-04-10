import "./ChatroomsList.css"
import Chatroom from "./Chatroom"
import react from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import socket from "../tool/socket"

function ChatroomsList(props){
    console.log("ChatroomList render")
    const [chatroomsElem,setChatroomsElem] =  react.useState([])

    const userID = props.userID
    const currentRoomID = props.currentRoomID
    react.useEffect(()=>{
        socket.on("reload-room",()=>{fetchChatrooms()})
        return ()=>{
            socket.off("reload-room")
        }
    })
    const navigate = useNavigate()

    react.useEffect(()=>{fetchChatrooms()},[props.currentRoomID])

    const fetchChatrooms = async ()=>{
        try{
            const response = await axios(`http://localhost:3001/api/chatroom/${userID}`)
            const {chatrooms} = response.data
            const chatroomselem = chatrooms.map((chatroom)=>(
                <Chatroom 
                    click = {()=>{
                        props.changeRoom(chatroom._id);
                        socket.emit("leave",currentRoomID)
                        socket.emit("join",chatroom._id)
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