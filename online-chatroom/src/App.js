import './App.css';
import react from "react"
import LoginPage from "./LoginPage"
import ChatroomList from "./ChatroomsList"
import MessageContainer from "./MessagesContainer"

function App() {
  const [currentUser,setCurrentUser] = react.useState("Sam")
  const [currentChatroom,setCurrentChatroom] = react.useState("")

  return (
    <div className="App">
      {currentUser? (
      <>
        <ChatroomList handleClick={(chatroom)=>setCurrentChatroom(chatroom)} currentUser={currentUser} currentChatroom={currentChatroom} />
        <MessageContainer currentChatroom={currentChatroom} currentUser={currentUser}/>
      </>) 
      : <LoginPage Login={ (username)=>{setCurrentUser(username)}}/>}
    </div>
  );
}

export default App;
