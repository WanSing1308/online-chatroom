import "./ChatroomsList.css"
import {TestingChatrooms} from "./Testing"
import Chatroom from "./Chatroom"

function ChatroomList(prop){
    
    const chatrooms = TestingChatrooms.filter(
        (chatroom)=>chatroom.users.find( user => user===prop.currentUser)
    )
/*     console.log(!prop.currentChatroom,chatrooms[0].name)
    if (!prop.currentChatroom)
    {
        prop.handleClick(chatrooms[0].name)
        return
    } */
         
    const chatroomsElem = chatrooms.map((chatroom)=>{
        return  <Chatroom Click={()=>{prop.handleClick(chatroom.name)}} name={chatroom.name} key={chatroom.id} selected={chatroom.name===prop.currentChatroom}/>
    })


    return (
        <div className="ChatroomsList">
            {chatroomsElem}
        </div>
    )
}
export default ChatroomList