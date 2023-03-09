import './App.css';
import react from "react"
import LoginPage from "./LoginPage"
import ChatroomsList from "./ChatroomsList"
import ChatroomInterface from "./ChatroomInterface"

function App() {
  const [currentUser,setCurrentUser] = react.useState("Sam")
  const [currentChatroom,setCurrentChatroom] = react.useState("Room1")

  return (
    <div className="App">
      {currentUser? (
      <>
        <ChatroomsList handleClick={(chatroom)=>setCurrentChatroom(chatroom)} currentUser={currentUser} currentChatroom={currentChatroom} />
        <ChatroomInterface currentChatroom={currentChatroom} currentUser={currentUser}/>
      </>) 

      : <LoginPage Login={ (username)=>{setCurrentUser(username)}}/>}
    </div>
  );
}

export default App;
