import "./LoginPage.css"
import {TestingUsers} from "./Testing"
import react from "react"

function LoginPage(prop){

    const [inputData,setInputData] = react.useState({})

    function handelChange(event){
        const name = event.target.name
        const value = event.target.value
        setInputData((oldData)=>({...oldData,[name]:value}))
        console.log(value)
    }

    function handleSubmit(){
        console.log(inputData)
        const userobj = TestingUsers.find((user)=>user.name==inputData.username)
        if (userobj==undefined){
            console.log("User not exist")
            return
        }
            
        if (userobj.password != inputData.password){
            console.log("Incorrect password")
            return
        }
        prop.Login(inputData.username)
    }
    
    return (
        <div className="LoginBox">
            <div className="inputfield">
                <label>Username:</label>
                <input id="username" name="username" value={inputData.username||""} onChange={handelChange}></input>
            </div>
            <div className="inputfield">
                <label>Password:</label>
                <input id="password" name="password" value={inputData.password||""} onChange={handelChange}></input>
            </div>
            <button onClick={handleSubmit}>Login</button>
        </div>
    )
}
export default LoginPage