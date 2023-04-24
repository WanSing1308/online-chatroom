import React from "react"
import { useNavigate } from "react-router-dom"
import ChatroomsList from "../component/ChatroomsList"
import ChatroomInterface from "../component/ChatroomInterface"
import useLocalStorage from "../tool/useLocalStorage"
import socket from "../tool/socket"

export default function Chat(){
    const navigate = useNavigate();
    const userID = localStorage.getItem("userID")
    const [currentRoomID,setCurrentRoomID] = React.useState(localStorage.getItem("currentRoomID") || undefined)
    // const [currentRoomID,setCurrentRoomID] = useLocalStorage("currentRoomID",undefined)
    const [connected,setConnected] = React.useState(socket.connected)

    React.useEffect(()=>{
        socket.on("connect",()=>{setConnected(true)})
        socket.on("disconnect",()=>{setConnected(false)})
        return ()=>{
            socket.off("connect")
            socket.off("disconnect")
        }
    })
    
    React.useEffect(()=>{
        if (!userID)
            navigate("/login")
    },[])
    return (
        <>
            <ChatroomsList 
                changeRoom={(id)=>{setCurrentRoomID(id);localStorage.setItem("currentRoomID",id)}} 
                currentRoomID={currentRoomID}
                userID={userID}
            />
            <ChatroomInterface 
                currentRoomID={currentRoomID} 
                userID={userID}
            />
        </>
    )
        

}