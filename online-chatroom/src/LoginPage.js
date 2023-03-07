import "./LoginPage.css"
import {TestingUsers} from "./Testing"

function LoginPage(prop){

    function handleClick(){
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const userobj = TestingUsers.find((user)=>user.name==username)
        if (userobj==undefined){
            console.log("User not exist")
            return
        }
            
        if (userobj.password != password){
            console.log("Incorrect password")
            return
        }
            
        prop.Login(username)
    }
    return (
        <div className="LoginBox">
            <div className="inputfield">
                <label>Username:</label>
                <input id="username"></input>
            </div>
            <div className="inputfield">
                <label>Password:</label>
                <input id="password"></input>
            </div>
            <button onClick={handleClick}>Login</button>
        </div>
    )
}
export default LoginPage