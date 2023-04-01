import React from "react"
import { useNavigate } from "react-router-dom"
import ChatroomsList from "../component/ChatroomsList"
import ChatroomInterface from "../component/ChatroomInterface"
import useLocalStorage from "../tool/useLocalStorage"

export default function Chat(){
    const navigate = useNavigate();
    const userID = localStorage.getItem("userID")
    const [currentRoomID,setCurrentRoomID] = useLocalStorage("currentRoomID",undefined)

    React.useEffect(()=>{
        if (!userID)
        navigate("/login")
    })
        
    return (
        <>
            <ChatroomsList setCurrentRoomID={setCurrentRoomID} currentRoomID={currentRoomID}/>
            <ChatroomInterface currentRoomID={currentRoomID}/>
        </>
    )
        

}