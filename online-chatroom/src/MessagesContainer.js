import "./MessagesContainer.css"
import Message from "./Message"
import react from "react"
function MessagesContainer(prop){
    let messagesElem
    if (prop.messages)
        messagesElem = prop.messages.map((message)=><Message message={message}/>)
    else
        messagesElem = []
    return (
        <div className="MessagesContainer">
            {messagesElem}       
        </div>
    )
}
export default MessagesContainer