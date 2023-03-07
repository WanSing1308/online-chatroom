import './App.css';

import react from "react"
import LoginPage from "./LoginPage"
import ChatroomList from "./ChatroomsList"

function App() {
  const [user,setUser] = react.useState("Peter")
  const [chatroom,setChatroom] = react.useState()
  return (
    <div className="App">
      {user? <div><ChatroomList user={user}/><MessageContainer chatroom={chatroom}/></div> : <LoginPage Login={ (username)=>{setUser(username)}}/>}
    </div>
  );
}

export default App;
