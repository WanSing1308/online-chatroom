import './App.css';
import react from "react"
import LoginPage from "./LoginPage"
import ChatroomsList from "./ChatroomsList"
import ChatroomInterface from "./ChatroomInterface"

function App() {
  const [currentUser,setCurrentUser] = react.useState("")
  const [currentChatroom,setCurrentChatroom] = react.useState("")

  return (
    <div className="App">
      {currentUser? (
      <>
        <ChatroomsList 
          changeroom={(chatroom)=>setCurrentChatroom(chatroom)} 
          currentUser={currentUser} 
          currentChatroom={currentChatroom} 
        />
        <ChatroomInterface 
          currentChatroom={currentChatroom} 
          currentUser={currentUser}
        />
      </>) 

      : <LoginPage Login={ (username)=>{setCurrentUser(username)}}/>}
    </div>
  );
}

export default App;
