import "./Login.css"
import React from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import socket from "../tool/socket"
function LoginPage(){

    const navigate = useNavigate()
    const [inputData,setInputData] = React.useState({})

    function handelChange(event){
        const name = event.target.name
        const value = event.target.value
        setInputData((oldData)=>({...oldData,[name]:value}))
    }

    const handleSignUp = async ()=>{
        try{
            const response = await axios.post("http://localhost:3001/api/user/sign-up",inputData)
            const {data} =response
            if (data.success)
                alert("sign up success")
            else
                alert("sign up failed")
        }
        catch(err){} 
    }

    const handleLogin= async ()=>{
        try{
            const response = await axios.post("http://localhost:3001/api/user/login",inputData)
            const {data} = response
            if (data.success){
                localStorage.setItem("userID",data.userID)          
                socket.connect()
                socket.emit("login",{userID:data.userID,userName:inputData.userName})
                navigate("/")
            }
            else
                alert("User not exist")
        }
        catch(err){
            alert("login failed")
        }
    }
    
    return (
        <div className="LoginBox">
            <div className="inputfield">
                <label>Username:</label>
                <input id="userName" name="userName" value={inputData.userName||""} onChange={handelChange}></input>
            </div>
            <div className="inputfield">
                <label>Password:</label>
                <input id="password" name="password" value={inputData.password||""} onChange={handelChange}></input>
            </div>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleSignUp}>Sign up</button>
        </div>
    )
}
export default LoginPage