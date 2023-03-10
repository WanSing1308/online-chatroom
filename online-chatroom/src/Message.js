import "./Message.css"

function Message(prop){
    return (
        <div onClick={prop.delete} className={prop.message.sender.userName==prop.currentUser? "message right":"message left"}>
            <div className="sender">{prop.message.sender.userName}</div>
            <div className="content">{prop.message.content}</div>
            <div className="time">{prop.message.time.split("T")[0]}</div>
        </div>
    )
}

export default Message