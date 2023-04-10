import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Chat from "./pages/Chat"
import Login from "./pages/Login"
import AddUser from "./pages/AddUser"
import CreateRoom from './pages/CreateRoom';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route index element={<Chat/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/addUser" element={<AddUser/>}/>
          <Route path="/createRoom" element={<CreateRoom/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App;
