import "./ChatroomsList.css"
import {TestingChatrooms} from "./Testing"
import Chatroom from "./Chatroom"

function ChatroomList(prop){

    const Chatrooms = TestingChatrooms.filter(
        (chatroom)=>chatroom.users.find( user => user==prop.user)
    )

    const ChatroomsElem = Chatrooms.map((chatroom)=>{
        return  <Chatroom Click={()=>{prop.handleClick(chatroom.name)}} name={chatroom.name} key={chatroom.id} selected={chatroom.name==prop.currentChatroom}/>
    })


    return (
        <div className="ChatroomsList">
            {ChatroomsElem}
        </div>
    )
}
export default ChatroomList