import "./MessagesContainer.css"
import {TestingChatrooms} from "./Testing"
import Message from "./Message"

function MessageContainer(prop){
    const chatroom = TestingChatrooms.find((chatroom)=> chatroom.name == prop.currentChatroom)
    const Messages = chatroom.messages.map((message)=><Message content={message.content}/>)
    return (
        <div className="MessagesContainer">
            {Messages}
            <div className="toolbar">
                <input className="textfield"></input>
            </div>
        </div>
    )
}
export default MessageContainer