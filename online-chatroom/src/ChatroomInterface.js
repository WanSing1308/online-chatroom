import "./ChatroomInterface.css"
import MessagesContainer from "./MessagesContainer"
import react from "react"
function ChatroomInterface(prop){
    console.log("ChatroomInterface render")
    const [content,setContent] = react.useState("")
    const [messages,setMessages] = react.useState("")
    react.useEffect(()=>{fetchMesssages()},[prop.currentChatroom])

    function handleInput(e){
        setContent(e.target.value)
    }
    const addUser = async ()
    const sendMessage = async ()=>{
        try{
            const res = await fetch("http://localhost:3000/api/message",{
                            method:"POST",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({content:content,userName:prop.currentUser,chatroomName:prop.currentChatroom})
                            })
            const response = await res.json()
            if (response.success)
            {
                fetchMesssages()
                setContent("")
            }
        }
        catch(err){}
    }
    const deleteMessage = async (messageID)=>{
        console.log(messageID);
        try{
            const res = await fetch(`http://localhost:3000/api/message/${messageID}`,
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
        if (!prop.currentChatroom)
            return []
        try{
            const res = await fetch("http://localhost:3000/api/message",{
                            method:"POST",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({chatroomName:prop.currentChatroom})
                        })
            const {messages} = await res.json()
            setMessages(messages)
        }
        catch(err){
            
        }
    }

    return (
    <div className="ChatroomInterface">
        <div className="Chatroom-info">
            {prop.currentChatroom}
            <input placeholder="Username"></input>
            <button onClick={addUser}>Add User</button>
        </div>
            
        <MessagesContainer 
            currentChatroom={prop.currentChatroom} 
            currentUser={prop.currentUser} 
            deletemessage={(messageId)=>{deleteMessage(messageId)}} 
            messages={messages}>
        </MessagesContainer>

        <div className="Chatroom-toolbar">
            <div className="container">
                <input className="textfield" placeholder="text" onChange={handleInput} value={content}></input>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    </div>)
}

export default ChatroomInterface