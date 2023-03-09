import "./ChatroomInterface.css"
import MessagesContainer from "./MessagesContainer"

function ChatroomInterface(prop){

    return (
    <div className="ChatroomInterface">
        <div className="Chatroom-info">{prop.currentChatroom}</div>
        <MessagesContainer currentChatroom={prop.currentChatroom} currentUser={prop.currentUser}></MessagesContainer>
        <div className="Chatroom-toolbar"></div>
    </div>)
}

export default ChatroomInterface