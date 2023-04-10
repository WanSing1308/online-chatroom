import "./ChatroomInterface.css"
import MessagesContainer from "./MessagesContainer"
import Logout from "./Logout"
import { useNavigate } from "react-router-dom"
import react from "react"
import axios from "axios"
import socket from "../tool/socket"

function ChatroomInterface(props){
    console.log("ChatroomInterface render")

    const currentRoomID = props.currentRoomID
    const userID = localStorage.getItem("userID")
    const [messages,setMessages] = react.useState("")
    
    const navigate = useNavigate();
    react.useEffect(()=>{fetchMesssages()},[props.currentRoomID])
    react.useEffect(()=>{
        socket.on("reload-msg",()=>{fetchMesssages()})
        return ()=>{
            socket.off("reload-msg")
        }
    })
    const sendMessage = async ()=>{
        const content_input = document.getElementById("content")
        const content = content_input.value
        try{
            const response = await axios.post(`http://localhost:3001/api/message/${currentRoomID}/${userID}`,{content:content})
            const {data} = response
            if (data.success){
                fetchMesssages()
                content_input.value = ""
                socket.emit("send-msg",currentRoomID)
            }
        }
        catch(err){}
    }

    const deleteMessage = async (messageID)=>{
        try{
            const response = await axios.delete(`http://localhost:3001/api/message/${currentRoomID}/${messageID}`)
            const {data} = response
            if (data.success){
                socket.emit("delete-msg",currentRoomID)
                fetchMesssages()
            }
                
        }
        catch(err){}
    }
    
    const fetchMesssages = async () =>{
        if (props.currentRoomID === undefined)
            setMessages([])
        try{
            const response = await axios.get(`http://localhost:3001/api/message/${currentRoomID}/${userID}`)  
            setMessages(response.data)
        }
        catch(err){}
    }
    
    return (
    <div id="ChatroomInterface">

        <div className="Chatroom-info">
            <Logout/>
        </div>
            
        <MessagesContainer 
            userID = {userID}
            currentRoomID = {props.currentRoomID}
            deletemessage={(messageId)=>{deleteMessage(messageId)}} 
            messages={messages}>
        </MessagesContainer>

        <div id="ChatroomInterface-textbar-container">
            <div id="ChatroomInterface-textbar">
                <input 
                    className="textfield" 
                    placeholder="text" 
                    id="content" 
                    onKeyDown={(e)=>{e.key==="Enter" && sendMessage()}}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    </div>)
}

export default ChatroomInterface