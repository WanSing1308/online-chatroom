import "./Message.css"

function Message(prop){
    return (
        <div className="message">{prop.content}</div>
    )
}

export default Message