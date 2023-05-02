import "./ChatroomInterface.css"
import MessagesContainer from "./MessagesContainer"
import Logout from "./Logout"
import {useContext,useEffect,useState} from "react"
import axios from "axios"
import socket from "../tool/socket"
import {IDContext} from "../pages/Chat"

function ChatroomInterface(props){
    const {currentRoomID,userID} = useContext(IDContext)
    const [messages,setMessages] = useState("")
    
    useEffect(()=>{fetchMesssages()},[currentRoomID])
    useEffect(()=>{
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
        if (currentRoomID === undefined){
            setMessages([])
            return
        }
        try{
            const response = await axios.get(`http://localhost:3001/api/message/${currentRoomID}/${userID}`)  
            setMessages(response.data)
        }
        catch(err){}
    }
    
    return (
    <div id="ChatroomInterface">

        <div className="ChatroomInterface-navbar">
            <Logout/>
        </div>
            
        <MessagesContainer 
            deletemessage={(messageId)=>{deleteMessage(messageId)}} 
            messages={messages}
        />

        <div id="ChatroomInterface-textbar-container">
            <div id="ChatroomInterface-textbar">
                <input 
                    className="textfield" 
                    placeholder="text" 
                    id="content" 
                    onKeyDown={(e)=>{e.key==="Enter" && sendMessage()}}
                    disabled={!currentRoomID}
                />
                <button onClick={sendMessage} disabled={!currentRoomID}>Send</button>
            </div>
        </div>
    </div>)
}

export default ChatroomInterface