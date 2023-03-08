import "./Message.css"

function Message(prop){
    return (
        <div className={prop.isCurrentUserMessage? "message right":"message left"}>
            <div className="sender">{prop.info.sender}</div>
            
            <div className="content">{prop.info.content}</div>
            <div className="time">{prop.info.time}</div>
        </div>
    )
}

export default Message