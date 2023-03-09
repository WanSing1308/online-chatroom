import "./ChatroomsList.css"
import {TestingChatrooms} from "./Testing"
import Chatroom from "./Chatroom"

function ChatroomsList(prop){
    const chatrooms = TestingChatrooms.filter(
        (chatroom)=>chatroom.users.find( user => user===prop.currentUser)
    )
         
    const chatroomsElem = chatrooms.map((chatroom)=>{
        return  <Chatroom Click={()=>{prop.handleClick(chatroom.name)}} name={chatroom.name} key={chatroom.id} selected={chatroom.name===prop.currentChatroom}/>
    })

    return (
        <div className="ChatroomsList">
            {chatroomsElem}
        </div>
    )
}
export default ChatroomsList