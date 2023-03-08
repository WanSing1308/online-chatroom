import "./MessagesContainer.css"
import {TestingChatrooms} from "./Testing"
import Message from "./Message"
import react from "react"
function MessageContainer(prop){
    const [text,setText] = react.useState("")
    
    function handleInput(event){
        const text = event.target.value
        setText(text)
    }
    if (!prop.currentChatroom)
        return  
    const chatroom = TestingChatrooms.find((chatroom)=> chatroom.name === prop.currentChatroom)
    const Messages = chatroom.messages.map((message)=><Message info={message} isCurrentUserMessage={message.sender === prop.currentUser}/>)
    return (
        <>
        <div className="chatroomInfo">
            <div className="chatroomName">{chatroom.name}</div>
            <div className="chatroomUsers">Members: {chatroom.users.join(" ")}</div>
        </div>
        <div className="MessagesContainer">
            {Messages}
        </div>
        <div className="toolbar">
            <input className="textfield" name="text" onChange={handleInput} value={text}></input>
            <i className="gg-backspace" onClick={()=>console.log("backspace")}></i>
            <i className="gg-corner-down-left" onClick={()=>console.log("submit")}></i>
        </div>
        </>
        
    )
}
export default MessageContainer