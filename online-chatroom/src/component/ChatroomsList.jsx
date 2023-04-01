import "./ChatroomsList.css"
import Chatroom from "./Chatroom"
import react from "react"


function ChatroomsList(props){
    const [newChatroomName,setNewChatroomName] = react.useState("")
    const [chatroomsElem,setChatroomsElem] =  react.useState([])

    const userID = localStorage.getItem("userID")
    react.useEffect(()=>{fetchChatrooms()},[props.currentRoomID])

    function handleInput(event){
        setNewChatroomName(event.target.value)
    }
    const fetchChatrooms = async ()=>{
        try{
            const res = await fetch(`http://localhost:3001/api/chatroom/${userID}`)
            if (res==="{}")
                setChatroomsElem([])  
            else{
                const {chatrooms} = await res.json()
                const chatroomselem = chatrooms.map((chatroom)=>(
                    <Chatroom 
                        click={()=>{
                            props.setCurrentRoomID(chatroom._id)
                        }} 
                        name={chatroom.chatroomName} 
                        key={chatroom._id} 
                        selected={chatroom._id===props.currentRoomID}
                    />))
                setChatroomsElem(chatroomselem)
            }
            
        }
        catch(err){}
    }

    const createChatroom = async ()=>{
        try{
            const res = await fetch(`http://localhost:3001/api/chatroom/${userID}`,{
                            method:"POST",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({chatroomName:newChatroomName})
                        })
            const data = await res.json();
            if (data.success)
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