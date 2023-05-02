import {useState,useEffect, createContext} from "react"
import { useNavigate } from "react-router-dom"
import ChatroomsList from "../component/ChatroomsList"
import ChatroomInterface from "../component/ChatroomInterface"

export const IDContext = createContext();
export default function Chat(){
    const navigate = useNavigate();
    const userID = localStorage.getItem("userID")
    const [currentRoomID,setCurrentRoomID] = useState(undefined)


    useEffect(()=>{
        if (!userID)
            navigate("/login")
    })
    return (
        <IDContext.Provider value={{currentRoomID,setCurrentRoomID,userID}}>
            <ChatroomsList />
            <ChatroomInterface />
        </IDContext.Provider>
    )
        

}