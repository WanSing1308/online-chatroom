import "./AddUser.css"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import socket from "../tool/socket"
function AddUser(){
    const navigate = useNavigate()
    const currentRoomID = localStorage.getItem("currentRoomID")

    const addUser = async()=>{
        const newUserField = document.getElementById("userName");
        const newUserName = newUserField.value;
        try{
            const response = await axios.put(`http://localhost:3001/api/chatroom/${currentRoomID}`,{userName:newUserName})
            const {data} = response
            if (data.success)
            {
                newUserField.value=""
                socket.emit("invite-to-room",newUserName)
            }
                
        }
        catch(err){}
    }
    return (
        <div className="AddUser-box">
            <h1 className="AddUser-heading">Add User</h1>
            <div className="AddUser-inputfield">
                <label htmlFor="userName" >Username:</label>
                <input type="text" placeholder="Username" id="userName" ></input>
            </div>
            <div className="AddUser-btnContainer"> 
                <button onClick={()=>{navigate("/")}}>Back</button>
                <button onClick={addUser}>Add</button>
            </div>
        </div>
    )
}

export default AddUser