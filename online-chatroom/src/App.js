import './App.css';
import react from "react"
import LoginPage from "./LoginPage"
import ChatroomsList from "./ChatroomsList"
import ChatroomInterface from "./ChatroomInterface"

function App() {
  const [userData,setUserData] = react.useState({})
  const [chatroomData,setChatroomData] = react.useState({})
  return (
    <div className="App">
      {JSON.stringify(userData)=="{}"? 
        <LoginPage Login={ (newUserData)=>{setUserData(newUserData)}}/>
        :
        (
          <>
        <ChatroomsList 
          changeroom={(newchatroomData)=>{
            setChatroomData(newchatroomData)
          }} 
          userData={userData}
          chatroomData={chatroomData}
        />
        <ChatroomInterface 
          userData={userData}
          chatroomData={chatroomData}
        />
      </>
      ) }

        
    </div>
  )
}

export default App;
