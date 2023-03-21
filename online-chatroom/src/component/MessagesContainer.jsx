import "./MessagesContainer.css"
import Message from "./Message"
import react from "react"
function MessagesContainer(props){
    console.log("MessagesContainer render")
    let messagesElem
    
    if (props.messages)
        messagesElem = props.messages.map((message)=>(
        <Message 
            delete={()=>{props.deletemessage(message._id)}} 
            key={message._id} 
            message={message}
            userName={props.userData.userName}
        />))
    else
        messagesElem = []
    return (
        <div className="MessagesContainer">
            {messagesElem}       
        </div>
    )
}
export default MessagesContainer