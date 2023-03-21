import React from "react"
import { useNavigate } from "react-router-dom"
import ChatroomsList from "../component/ChatroomsList"
import ChatroomInterface from "../component/ChatroomInterface"

export default function Chat(props){
    const navigate = useNavigate();
    React.useEffect(()=>{
        if (JSON.stringify(props.userData)==="{}")
            navigate("/login")
    },[])
    
    return (
        <>
            <ChatroomsList 
                userData={props.userData} 
                chatroomData={props.chatroomData}
                changeroom={(newchatroomData)=>props.changeroom(newchatroomData)}
            />
            <ChatroomInterface 
                userData={props.userData} 
                chatroomData={props.chatroomData}
            />
        </>
    )
        

}