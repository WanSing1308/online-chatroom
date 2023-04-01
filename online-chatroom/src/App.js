import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat"
import Login from "./pages/Login"

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<Chat/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App;
