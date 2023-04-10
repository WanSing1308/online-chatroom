import "./AddUser.css"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import socket from "../tool/socket"
function AddUser(){
    const navigate = useNavigate()
    const currentRoomID = localStorage.getItem("currentRoomID")

    const addUser = async()=>{
        const newUser = document.getElementById("userName");
        const newUserName = newUser.value;
        try{
            const response = await axios.put(`http://localhost:3001/api/chatroom/${currentRoomID}`,{userName:newUserName})
            const {data} = response
            if (data.success)
            {
                newUser.value=""
                socket.emit("invite-to-room",newUserName)
            }
                
        }
        catch(err){}
    }
    return (
        <div className="box">
            <div className="">Add User</div>
            <div className="inputfield">
                <label htmlFor="userName" >Username</label>
                <input type="text" placeholder="Username" id="userName" ></input>
            </div>
            
            <button onClick={addUser}>Add</button>
            <button onClick={()=>{navigate("/")}}>Back</button>
        </div>
    )
}

export default AddUser