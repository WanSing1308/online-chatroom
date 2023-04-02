import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat"
import Login from "./pages/Login"
import AddUser from "./pages/AddUser"
function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route index element={<Chat/>}/>
          <Route path="/addUser" element={<AddUser/>}/>

        </Routes>
      </BrowserRouter>
  )
}

export default App;
