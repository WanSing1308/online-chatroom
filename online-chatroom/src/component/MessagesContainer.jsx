import "./MessagesContainer.css"
import Message from "./Message"
function MessagesContainer(props){
    let messagesElem
    
    if (!props.messages.length)
        messagesElem = []
    else{
        messagesElem = props.messages.map(message =>(
            <Message 
                delete={()=>{props.deletemessage(message._id)}} 
                key={message._id} 
                message = {message}
            />))
    }

    return (
        <div className="MessagesContainer">
            {messagesElem}       
        </div>
    )
}
export default MessagesContainer