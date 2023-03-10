import "./ChatroomsList.css"
import Chatroom from "./Chatroom"
import react from "react"
function ChatroomsList(prop){
    const [newchatroomname,setnewchatroomname] = react.useState("")
    function handleInput(e){
        console.log(newchatroomname)
        setnewchatroomname(e.target.value)
    }
    const fetchchatrooms = async ()=>{
        try{
            const res = await fetch("http://localhost:3000/api/fetchchatrooms",{
                            method:"POST",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({username:prop.currentUser})
                        })
            const chatrooms = await res.json()
            if (chatrooms){
                if (prop.currentChatroom){
                    const chatroomselem = chatrooms.map((chatroom)=>{
                        return  <Chatroom click={( )=>prop.changeroom(chatroom.chatroomname)} name={chatroom.chatroomname} key={chatroom._id} selected={chatroom.chatroomname===prop.currentChatroom}/>
                    })
                    setChatroomsElem(chatroomselem)
                }
                else{
                    prop.changeroom("Room1")
                }
            }
        }
        catch(err){
        }
    }
    const createchatroom = async ()=>{
        try{
            const res = await fetch("http://localhost:3000/api/createchatroom",{
                            method:"POST",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({username:prop.currentUser,chatroomname:newchatroomname})
                        })
            const response = await res.json();
            if (response.success)
            {
                alert("created")
                fetchchatrooms()
            } 
            else
                alert("failed")
        }
        catch(err){

        }
    
    }
    const [chatroomsElem,setChatroomsElem] =  react.useState([])
    react.useEffect(()=>{fetchchatrooms();},[prop.currentChatroom])
    return (
        <>
            <div className="ChatroomsList">
                {chatroomsElem}
                <div className="ChatroomsList-toolbar">
                    <div>
                        <input placeholder="name" value={newchatroomname} onChange={handleInput}></input>
                        <button onClick={createchatroom}>create</button>
                    </div>
                    
                </div>
            </div>
            
        </>
        
    )
}
export default ChatroomsList