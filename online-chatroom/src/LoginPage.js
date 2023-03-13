import "./LoginPage.css"
import react from "react"

function LoginPage(prop){

    const [inputData,setInputData] = react.useState({})

    function handelChange(event){
        const name = event.target.name
        const value = event.target.value
        setInputData((oldData)=>({...oldData,[name]:value}))
    }

    const handleSignUp = async ()=>{
        try{
            const res = await fetch("http://localhost:3000/api/createUser",{
                method:"POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputData)
            })
            const data = await res.json()
            if (data.success){
                alert("sign up success")
            }
            else{
                alert("sign up failed")
            }   
        }
        catch(err){
        } 
    }

    const handleLogin= async ()=>{
        try{
            const res = await fetch("http://localhost:3000/api/userLogin",{
                            method:"POST",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(inputData)
                        })
            const data = await res.json()
            if (data.success){
                prop.Login(inputData.userName)
            }
            else{
                alert("User not exist")
            }
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