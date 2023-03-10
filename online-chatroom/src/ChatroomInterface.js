import "./ChatroomInterface.css"
import MessagesContainer from "./MessagesContainer"
import react from "react"
function ChatroomInterface(prop){
    const [content,setContent] = react.useState("")
    const [messages,setMessages] = react.useState("")

    function handleInput(e){
        console.log(e.target.value)
        setContent(e.target.value)
    }

    const sendmessage = async ()=>{
        const res = await fetch("http://localhost:3000/api/sendmessage",{
                            method:"POST",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({content:content,username:prop.currentUser,chatroomname:prop.currentChatroom})
                            })
        
        const response = await res.json()
        if (response.success)
        {
            fetchmesssages()
            setContent("")
        }
        else
            alert("something broken")
    }
    
    const fetchmesssages = async () =>{
        if (!prop.currentChatroom)
            return []
        try{
            const res = await fetch("http://localhost:3000/api/getmessage",{
                            method:"POST",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({chatroomname:prop.currentChatroom})
                        })
            const {messages} = await res.json()
            setMessages(messages)
        }
        catch(err){
            alert("failed")
        }
    }

    react.useEffect(()=>{fetchmesssages()},[prop.currentChatroom])

    return (
    <div className="ChatroomInterface">
        <div className="Chatroom-info">{prop.currentChatroom}</div>
        <MessagesContainer currentChatroom={prop.currentChatroom} currentUser={prop.currentUser} messages={messages}></MessagesContainer>
        <div className="Chatroom-toolbar">
            <div className="container">
                <input className="textfield" placeholder="text" onChange={handleInput} value={content}></input>
                <button onClick={sendmessage}>Send</button>
            </div>
        </div>
    </div>)
}

export default ChatroomInterface