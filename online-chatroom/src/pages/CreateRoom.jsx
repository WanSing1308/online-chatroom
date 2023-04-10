
import { useNavigate } from "react-router-dom"
import axios from "axios"

function CreateRoom(){
    const navigate = useNavigate()
    const userID = localStorage.getItem("userID")
    
    const createChatroom = async ()=>{
        try{
            const roomName = document.getElementById("room name").value
            const response = await axios.post(`http://localhost:3001/api/chatroom/${userID}`,{chatroomName:roomName})
            const {data} = response
            if (data.success)
                console.log("success")
        }
        catch(err){}
    }
    return (
        <div className="box">
            <div>Create Room</div>
            <div className="inputfield">
                <label htmlFor="userName" >Room name</label>
                <input type="text" placeholder="room name" id="room name" ></input>
            </div>
            
            <button onClick={()=>{createChatroom()}}>Create</button>
            <button onClick={()=>{navigate("/")}}>Back</button>
        </div>
    )
}

export default CreateRoom