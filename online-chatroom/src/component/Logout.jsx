import socket from "../tool/socket"
import { useNavigate } from "react-router-dom"

function Logout(){
    const userID = localStorage.getItem("userID")
    const navigate = useNavigate()
    const logout = ()=>{
        socket.emit("logout",userID)
        socket.disconnect()
        localStorage.clear()
        navigate("/login")
    }
    return (
        <button onClick={logout}>Logout</button>
    )
}
export default Logout