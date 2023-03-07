import "./ChatroomsList.css"
import {TestingChatrooms} from "./Testing"
import Chatroom from "./Chatroom"

function ChatroomList(prop){
    const Chatrooms = TestingChatrooms.filter(
        (chatroom)=>chatroom.users.find( user => user==prop.user)
    )
    const ChatroomsElem = Chatrooms.map((chatroom)=><Chatroom name={chatroom.name}/>)

    return (
        <div className="ChatroomsList">
            {ChatroomsElem}
        </div>
    )
}
export default ChatroomList