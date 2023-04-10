import {io} from "socket.io-client"

const socket = io(":3001",{autoConnect:false})
export default socket