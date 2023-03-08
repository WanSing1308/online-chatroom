import "./Chatroom.css"

function Chatroom(prop){
    const selectedStyle = {backgroundColor:"lightgrey"}


    return (
    <div className="Chatroom" onClick={prop.Click} style={prop.selected? selectedStyle:{} }>
        <h3>{prop.name}</h3>
        {/* <i class="gg-close"></i> */}
    </div>)
}

export default Chatroom