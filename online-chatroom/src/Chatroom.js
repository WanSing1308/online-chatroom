import "./Chatroom.css"

function Chatroom(prop){

    return (
        <div className={prop.selected? "Chatroom selected" : "Chatroom"} onClick={prop.Click}>
            <div>{prop.name}</div>
        </div>
    )
}

export default Chatroom