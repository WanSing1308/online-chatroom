import "./ChatroomsList.css"
import Chatroom from "./Chatroom"
import react from "react"
function ChatroomsList(prop){
    const [newChatroomName,setNewChatroomName] = react.useState("")
    const [chatroomsElem,setChatroomsElem] =  react.useState([])
    
    react.useEffect(()=>{fetchChatrooms();},[prop.chatroomData])

    function handleInput(event){
        setNewChatroomName(event.target.value)
    }
    
    const fetchChatrooms = async ()=>{
        try{
            const res = await fetch(`http://localhost:3000/api/chatroom/${prop.userData._id}`)
            if (res==="{}")
                setChatroomsElem([])  
            else{
                const {chatrooms} = await res.json()
                const chatroomselem = chatrooms.map((chatroom)=>(
                    <Chatroom 
                        click={()=>{
                            prop.changeroom({
                                chatroomName:chatroom.chatroomName,
                                _id:chatroom._id
                            })
                        }} 
                        name={chatroom.chatroomName} 
                        key={chatroom._id} 
                        selected={chatroom._id===prop.chatroomData._id}
                    />))
                setChatroomsElem(chatroomselem)
            }
            
        }
        catch(err){
        }
    }
    const createChatroom = async ()=>{
        try{
            const res = await fetch(`http://localhost:3000/api/chatroom/${prop.userData._id}`,{
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