import "./ChatroomInterface.css"
import MessagesContainer from "./MessagesContainer"
import react from "react"


function ChatroomInterface(props){
    console.log("ChatroomInterface render")
    const userID = localStorage.getItem("userID")
    const [messages,setMessages] = react.useState("")

    react.useEffect(()=>{fetchMesssages()},[props.currentRoomID])

    const sendMessage = async ()=>{
        const content_input = document.getElementById("content")
        const content = content_input.value
        try{
            const res = await fetch(`http://localhost:3001/api/message/${props.currentRoomID}/${userID}`,
                            {
                                method:"POST",
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({content:content})
                            })
            const response = await res.json()
            if (response.success)
            {
                fetchMesssages()
                content_input.value = ""
            }
        }
        catch(err){}
    }
    const deleteMessage = async (messageID)=>{
        try{
            const res = await fetch(`http://localhost:3001/api/message/${props.currentRoomID}/${messageID}`,
            {
                method:"DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
            }})
            const response = await res.json()
            if (response.success)
                fetchMesssages()
        }
        catch(err){}
    }
    
    const fetchMesssages = async () =>{
        if (JSON.stringify(props.chatroomData)==="{}")
            return []
        try{
            const res = await fetch(`http://localhost:3001/api/message/${props.currentRoomID}/${userID}`)
            const {messages} = await res.json()
            setMessages(messages)
        }
        catch(err){}
    }

    const addUser = async()=>{
        const newUser = document.getElementById("newUser");
        try{
            const res = await fetch(`http://localhost:3001/api/chatroom/${props.currentRoomID}`,
                        {
                            method:"PUT",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({userName:newUser.value})
                        })
            const response = await res.json()
            if (response.success)
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