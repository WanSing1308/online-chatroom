import './App.css';
import react from "react"
import LoginPage from "./LoginPage"
import ChatroomList from "./ChatroomsList"
import MessageContainer from "./MessagesContainer"

function App() {
  const [user,setUser] = react.useState("Sam")
  const [currentChatroom,setCurrentChatroom] = react.useState("testing1")

  return (
    <div className="App">
      {user? (
      <div>
        <ChatroomList handleClick={(chatroom)=>setCurrentChatroom(chatroom)} user={user} currentChatroom={currentChatroom} />
        <MessageContainer currentChatroom={currentChatroom}/>
      </div>) 
      : <LoginPage Login={ (username)=>{setUser(username)}}/>}
    </div>
  );
}

export default App;
