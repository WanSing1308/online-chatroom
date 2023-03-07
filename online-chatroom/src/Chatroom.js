import "./Chatroom.css"

function Chatroom(prop){
    const selectedStyle = {backgroundColor:"lightgrey"}
    const normal = {backgroundColor:"white"}

    return (
    <div className="Chatroom" onClick={prop.Click} style={prop.selected ? selectedStyle : normal  }>
        <h3>{prop.name}</h3>
        {/* <i class="gg-close"></i> */}
    </div>)
}

export default Chatroom