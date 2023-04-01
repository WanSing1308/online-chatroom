import "./Chatroom.css"
import { AiOutlineClose } from 'react-icons/ai';
function Chatroom(props){

    return (
        <div className={props.selected? "Chatroom selected" : "Chatroom"} onClick={props.click}>
            <div>{props.name}</div>
            
        </div>
    )
}

export default Chatroom