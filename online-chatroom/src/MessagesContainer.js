import "./MessagesContainer.css"
import Message from "./Message"
import react from "react"
function MessagesContainer(prop){
    console.log("MessagesContainer render")
    let messagesElem
    if (prop.messages)
        messagesElem = prop.messages.map((message)=><Message delete={()=>{prop.deletemessage(message._id)}} key={message._id} message={message}currentUser={prop.currentUser}/>)
    else
        messagesElem = []
    return (
        <div className="MessagesContainer">
            {messagesElem}       
        </div>
    )
}
export default MessagesContainer