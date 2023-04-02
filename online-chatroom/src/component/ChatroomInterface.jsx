import "./ChatroomInterface.css"
import MessagesContainer from "./MessagesContainer"
import react from "react"
import axios from "axios"

function ChatroomInterface(props){
    console.log("ChatroomInterface render")
    const userID = localStorage.getItem("userID")
    const [messages,setMessages] = react.useState("")

    react.useEffect(()=>{fetchMesssages()},[props.currentRoomID])

    const sendMessage = async ()=>{
        const content_input = document.getElementById("content")
        const content = content_input.value
        try{
            const response = await axios.post(`http://localhost:3001/api/message/${props.currentRoomID}/${userID}`,{content:content})
            const {data} = response
            if (data.success){
                fetchMesssages()
                content_input.value = ""
            }
        }
        catch(err){}
    }

    const deleteMessage = async (messageID)=>{
        try{
            const response = await axios.delete(`http://localhost:3001/api/message/${props.currentRoomID}/${messageID}`)
            const {data} = response
            if (data.success)
                fetchMesssages()
        }
        catch(err){}
    }
    
    const fetchMesssages = async () =>{
        if (!props.currentRoomID)
            setMessages([])
        try{
            const response = await axios.get(`http://localhost:3001/api/message/${props.currentRoomID}/${userID}`)
            const {messages} = response.data
            setMessages(messages)
        }
        catch(err){}
    }

    const addUser = async()=>{
        const newUser = document.getElementById("newUser");
        try{
            const response = await axios.put(`http://localhost:3001/api/chatroom/${props.currentRoomID}`,{userName:newUser.value})
            const {data} = response
            if (data.success)
                newUser.value=""
        }
        catch(err){}
    }
    return (
    <div className="ChatroomInterface">

        <div className="Chatroom-info">
            {props.currentRoomID}
            <div className="Chatroom-addUser">
                <input placeholder="Username" id="newUser"></input>
                <button onClick={addUser}>Add User</button>
            </div>
        </div>
            
        <MessagesContainer 
            userID = {userID}
            currentRoomID = {props.currentRoomID}
            deletemessage={(messageId)=>{deleteMessage(messageId)}} 
            messages={messages}>
        </MessagesContainer>

        <div className="Chatroom-toolbar">
            <div className="container">
                <input className="textfield" placeholder="text" id="content"></input>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    </div>)
}

export default ChatroomInterface