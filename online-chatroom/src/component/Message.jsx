import "./Message.css"

function Message(props){
    const {sender,time,fromSelf,content} = props.message
    return (
        <div onClick={props.delete} className={fromSelf? "message right":"message left"}>
            <div className="sender">{sender.userName}</div>
            <div className="content">{content}</div>
            <div className="time">{time.split("T")[0]}</div>
        </div>
    )
}

export default Message