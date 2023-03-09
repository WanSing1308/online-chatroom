import "./MessagesContainer.css"
import {TestingChatrooms} from "./Testing"
import Message from "./Message"
function MessagesContainer(prop){
   
    const chatroom = TestingChatrooms.find((chatroom)=>chatroom.name===prop.currentChatroom)
    const messagesElem = chatroom.messages.map((message)=><Message isCurrentUserMessage={prop.currentUser===message.sender} message={message}></Message>)

    return (
        <div className="MessagesContainer">
            {messagesElem}       
        </div>
    )
}
export default MessagesContainer