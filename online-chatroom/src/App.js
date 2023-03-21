import './App.css';
import react from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat"
import Login from "./pages/Login"

function App() {
  const [userData,setUserData] = react.useState({})
  const [chatroomData,setChatroomData] = react.useState({})

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={
            <Login
            Login={ (newUserData)=>{setUserData(newUserData)}}
            />}
          />
          <Route path="/" element={<Chat
            changeroom={(newchatroomData)=>{
              setChatroomData(newchatroomData)
            }} 
            userData={userData}
            chatroomData={chatroomData}
            />}
          />
        </Routes>
      </BrowserRouter>
  )

  
}

export default App;
