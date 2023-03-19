import "./ChatroomsList.css"
import Chatroom from "./Chatroom"
import react from "react"
function ChatroomsList(prop){
    console.log("ChatroomList render")
    const [newChatroomName,setNewChatroomName] = react.useState("")
    const [chatroomsElem,setChatroomsElem] =  react.useState([])
    react.useEffect(()=>{fetchChatrooms();},[prop.currentChatroom])

    function handleInput(event){
        setNewChatroomName(event.target.value)
    }

    const fetchChatrooms = async ()=>{
        try{
            const res = await fetch(`http://localhost:3000/api/chatrooms/${prop.currentUser}`)
            const chatrooms = await res.json()
            if (chatrooms){
                if (prop.currentChatroom){
                    const chatroomselem = chatrooms.map((chatroom)=>{
                        return  <Chatroom click={( )=>prop.changeroom(chatroom.chatroomName)} name={chatroom.chatroomName} key={chatroom._id} selected={chatroom.chatroomName===prop.currentChatroom}/>
                    })
                    setChatroomsElem(chatroomselem)
                }
                else{
                    prop.changeroom(chatrooms[0].chatroomName)
                }
            }
        }
        catch(err){
        }
    }
    const createChatroom = async ()=>{
        try{
            const res = await fetch(`http://localhost:3000/api/chatroom/${prop.currentUser}`,{
                            method:"POST",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({chatroomName:newChatroomName})
                        })
            const response = await res.json();
            if (response.success)
                fetchChatrooms() 
        }
        catch(err){}
    }

    return (
        <>
            <div className="ChatroomsList">
                {chatroomsElem}
                <div className="ChatroomsList-toolbar">
                    <div>
                        <input placeholder="name" value={newChatroomName} onChange={handleInput}></input>
                        <button onClick={createChatroom}>create</button>
                    </div>
                </div>
            </div>
            
        </>
        
    )
}
export default ChatroomsList