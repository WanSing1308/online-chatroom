import "./Message.css"

function Message(prop){
    return (
        <div className={prop.isCurrentUserMessage? "message right":"message left"}>
            <div className="sender">{prop.message.sender}</div>
            <div className="content">{prop.message.content}</div>
            <div className="time">{prop.message.time}</div>
        </div>
    )
}

export default Message