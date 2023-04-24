import "./CreateRoom.css"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function CreateRoom(){
    const navigate = useNavigate()
    const userID = localStorage.getItem("userID")
    
    const createChatroom = async ()=>{
        try{
            const roomNameField = document.getElementById("room name")
            const roomName = roomNameField.value
            const response = await axios.post(`http://localhost:3001/api/chatroom/${userID}`,{chatroomName:roomName})
            const {data} = response
            if (data.success)
                roomNameField.value = "";
        }
        catch(err){}
    }
    return (
        <div className="CreateRoom-box">
            <h1 className="CreateRoom-heading">Create Room</h1>
            <div className="CreateRoom-inputfield">
                <label htmlFor="userName" >Room name:</label>
                <input type="text" placeholder="room name" id="room name" ></input>
            </div>
                <div className="CreateRoom-btnContainer"> 
                <button onClick={()=>{createChatroom()}}>Create</button>
                <button onClick={()=>{navigate("/")}}>Back</button>
            </div>
        </div>
    )
}

export default CreateRoom